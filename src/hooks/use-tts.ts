import { useState, useCallback, useRef, useEffect } from 'react';

// Persist TTS progress per movement so user can resume after leaving
const STORAGE_KEY = 'tts-progress';

interface TTSProgress {
  movementId: string;
  chunkIndex: number;
  currentTime: number;
}

function saveProgress(progress: TTSProgress) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch {}
}

function loadProgress(): TTSProgress | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function clearProgress() {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

function splitTextIntoChunks(text: string, maxSize = 4000): string[] {
  if (text.length <= maxSize) return [text];
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    if ((current + " " + sentence).length > maxSize && current) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current = current ? current + " " + sentence : sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

async function fetchAudioBlob(text: string): Promise<Blob> {
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/google-tts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ text, languageCode: "en-US" }),
    }
  );
  if (!response.ok) throw new Error(`TTS failed: ${response.status}`);
  return response.blob();
}

export function useTTS(movementId?: string) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasResumable, setHasResumable] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlsRef = useRef<string[]>([]);
  const cancelledRef = useRef(false);
  const queueRef = useRef<Blob[]>([]);
  const playingIndexRef = useRef(0);
  const movementIdRef = useRef(movementId);
  const chunksTextRef = useRef<string[]>([]);

  // Check if there's a saved position for this movement
  useEffect(() => {
    movementIdRef.current = movementId;
    if (movementId) {
      const saved = loadProgress();
      setHasResumable(!!saved && saved.movementId === movementId);
    }
  }, [movementId]);

  const cleanupUrls = useCallback(() => {
    objectUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
    objectUrlsRef.current = [];
  }, []);

  const cleanup = useCallback(() => {
    cancelledRef.current = true;
    // Save progress before cleaning up
    if (audioRef.current && movementIdRef.current && isSpeaking) {
      saveProgress({
        movementId: movementIdRef.current,
        chunkIndex: playingIndexRef.current,
        currentTime: audioRef.current.currentTime || 0,
      });
      setHasResumable(true);
    }
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    cleanupUrls();
    queueRef.current = [];
    playingIndexRef.current = 0;
    chunksTextRef.current = [];
    setIsSpeaking(false);
    setIsPaused(false);
    setIsLoading(false);
  }, [cleanupUrls, isSpeaking]);

  const playNext = useCallback(() => {
    const idx = playingIndexRef.current;
    const queue = queueRef.current;

    if (cancelledRef.current || idx >= queue.length) {
      // Finished all chunks — clear saved progress
      clearProgress();
      setHasResumable(false);
      cancelledRef.current = true;
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      cleanupUrls();
      queueRef.current = [];
      playingIndexRef.current = 0;
      chunksTextRef.current = [];
      setIsSpeaking(false);
      setIsPaused(false);
      setIsLoading(false);
      return;
    }

    const url = URL.createObjectURL(queue[idx]);
    objectUrlsRef.current.push(url);
    const audio = new Audio(url);
    audioRef.current = audio;

    audio.onended = () => {
      playingIndexRef.current++;
      // Save progress after each chunk
      if (movementIdRef.current) {
        saveProgress({ movementId: movementIdRef.current, chunkIndex: playingIndexRef.current, currentTime: 0 });
      }
      playNext();
    };
    audio.onerror = () => {
      clearProgress();
      setHasResumable(false);
      cancelledRef.current = true;
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      cleanupUrls();
      queueRef.current = [];
      playingIndexRef.current = 0;
      setIsSpeaking(false);
      setIsPaused(false);
      setIsLoading(false);
    };

    audio.play().catch(() => cleanup());
  }, [cleanup, cleanupUrls]);

  const speak = useCallback(async (text: string, fromChunkIndex = 0) => {
    // Reset without saving progress
    cancelledRef.current = false;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    cleanupUrls();
    queueRef.current = [];
    setIsLoading(true);
    setIsSpeaking(false);
    setIsPaused(false);

    const chunks = splitTextIntoChunks(text);
    chunksTextRef.current = chunks;
    playingIndexRef.current = fromChunkIndex;

    try {
      // Fetch from the resume chunk
      const firstBlob = await fetchAudioBlob(chunks[fromChunkIndex]);
      if (cancelledRef.current) return;

      // Fill earlier slots with empty blobs so indices line up
      for (let i = 0; i < fromChunkIndex; i++) {
        queueRef.current.push(new Blob());
      }
      queueRef.current[fromChunkIndex] = firstBlob;
      setIsLoading(false);
      setIsSpeaking(true);
      playNext();

      // Fetch remaining chunks in background
      for (let i = fromChunkIndex + 1; i < chunks.length; i++) {
        if (cancelledRef.current) return;
        const blob = await fetchAudioBlob(chunks[i]);
        if (cancelledRef.current) return;
        queueRef.current[i] = blob;
      }
    } catch (error) {
      console.error("TTS error:", error);
      cleanup();
    }
  }, [cleanup, cleanupUrls, playNext]);

  const stop = useCallback(() => {
    // Save progress then stop
    if (audioRef.current && movementIdRef.current && isSpeaking) {
      saveProgress({
        movementId: movementIdRef.current,
        chunkIndex: playingIndexRef.current,
        currentTime: audioRef.current.currentTime || 0,
      });
      setHasResumable(true);
    }
    cancelledRef.current = true;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    cleanupUrls();
    queueRef.current = [];
    playingIndexRef.current = 0;
    chunksTextRef.current = [];
    setIsSpeaking(false);
    setIsPaused(false);
    setIsLoading(false);
  }, [cleanupUrls, isSpeaking]);

  const restart = useCallback(() => {
    clearProgress();
    setHasResumable(false);
  }, []);

  const getSavedProgress = useCallback((): TTSProgress | null => {
    if (!movementId) return null;
    const saved = loadProgress();
    return saved && saved.movementId === movementId ? saved : null;
  }, [movementId]);

  const pause = useCallback(() => {
    if (audioRef.current && isSpeaking && !isPaused) {
      audioRef.current.pause();
      setIsPaused(true);
    }
  }, [isSpeaking, isPaused]);

  const resume = useCallback(() => {
    if (audioRef.current && isSpeaking && isPaused) {
      audioRef.current.play();
      setIsPaused(false);
    }
  }, [isSpeaking, isPaused]);

  useEffect(() => {
    return () => {
      // Save progress on unmount
      if (audioRef.current && movementIdRef.current) {
        saveProgress({
          movementId: movementIdRef.current,
          chunkIndex: playingIndexRef.current,
          currentTime: audioRef.current.currentTime || 0,
        });
      }
      cancelledRef.current = true;
      if (audioRef.current) audioRef.current.pause();
      objectUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  return { speak, stop, pause, resume, restart, isSpeaking, isPaused, isLoading, hasResumable, getSavedProgress };
}

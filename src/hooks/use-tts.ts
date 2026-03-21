import { useState, useCallback, useRef, useEffect } from 'react';

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

export function useTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlsRef = useRef<string[]>([]);
  const cancelledRef = useRef(false);
  const queueRef = useRef<Blob[]>([]);
  const playingIndexRef = useRef(0);

  const cleanupUrls = useCallback(() => {
    objectUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
    objectUrlsRef.current = [];
  }, []);

  const cleanup = useCallback(() => {
    cancelledRef.current = true;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    cleanupUrls();
    queueRef.current = [];
    playingIndexRef.current = 0;
    setIsSpeaking(false);
    setIsPaused(false);
    setIsLoading(false);
  }, [cleanupUrls]);

  const playNext = useCallback(() => {
    const idx = playingIndexRef.current;
    const queue = queueRef.current;

    if (cancelledRef.current || idx >= queue.length) {
      cleanup();
      return;
    }

    const url = URL.createObjectURL(queue[idx]);
    objectUrlsRef.current.push(url);
    const audio = new Audio(url);
    audioRef.current = audio;

    audio.onended = () => {
      playingIndexRef.current++;
      playNext();
    };
    audio.onerror = () => {
      cleanup();
    };

    audio.play().catch(() => cleanup());
  }, [cleanup]);

  const speak = useCallback(async (text: string) => {
    cleanup();
    cancelledRef.current = false;
    setIsLoading(true);

    const chunks = splitTextIntoChunks(text);
    queueRef.current = [];
    playingIndexRef.current = 0;

    try {
      // Fetch first chunk immediately
      const firstBlob = await fetchAudioBlob(chunks[0]);
      if (cancelledRef.current) return;

      queueRef.current.push(firstBlob);
      setIsLoading(false);
      setIsSpeaking(true);
      playNext();

      // Fetch remaining chunks in background
      for (let i = 1; i < chunks.length; i++) {
        if (cancelledRef.current) return;
        const blob = await fetchAudioBlob(chunks[i]);
        if (cancelledRef.current) return;
        queueRef.current.push(blob);
      }
    } catch (error) {
      console.error("TTS error:", error);
      cleanup();
    }
  }, [cleanup, playNext]);

  const stop = useCallback(() => cleanup(), [cleanup]);

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
      cancelledRef.current = true;
      if (audioRef.current) audioRef.current.pause();
      objectUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  return { speak, stop, pause, resume, isSpeaking, isPaused, isLoading };
}

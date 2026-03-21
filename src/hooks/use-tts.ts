import { useState, useCallback, useRef, useEffect } from 'react';

export function useTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const cleanup = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setIsSpeaking(false);
    setIsPaused(false);
    setIsLoading(false);
  }, []);

  const stop = useCallback(() => {
    cleanup();
  }, [cleanup]);

  const speak = useCallback(async (text: string) => {
    stop();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/google-tts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text, languageCode: "tr-TR" }),
        }
      );

      if (!response.ok) {
        throw new Error(`TTS request failed: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      objectUrlRef.current = audioUrl;

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        cleanup();
      };
      audio.onerror = () => {
        cleanup();
      };

      await audio.play();
      setIsLoading(false);
      setIsSpeaking(true);
    } catch (error) {
      console.error("TTS error:", error);
      cleanup();
    }
  }, [stop, cleanup]);

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
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  return { speak, stop, pause, resume, isSpeaking, isPaused, isLoading };
}

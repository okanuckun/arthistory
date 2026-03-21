import { useState, useCallback, useEffect, useRef } from 'react';

export function useTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    utteranceRef.current = null;
  }, []);

  const speak = useCallback((text: string) => {
    stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR';
    utterance.rate = 0.95;
    utterance.pitch = 1;

    // Try to pick a good Turkish voice
    const voices = window.speechSynthesis.getVoices();
    const turkishVoice = voices.find(v => v.lang.startsWith('tr') && v.name.toLowerCase().includes('google'))
      || voices.find(v => v.lang.startsWith('tr'));
    if (turkishVoice) utterance.voice = turkishVoice;

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      utteranceRef.current = null;
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      utteranceRef.current = null;
    };

    utteranceRef.current = utterance;
    setIsSpeaking(true);
    setIsPaused(false);
    window.speechSynthesis.speak(utterance);
  }, [stop]);

  const pause = useCallback(() => {
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isSpeaking, isPaused]);

  const resume = useCallback(() => {
    if (isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isSpeaking, isPaused]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return { speak, stop, pause, resume, isSpeaking, isPaused };
}

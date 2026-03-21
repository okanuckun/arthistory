import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MovementContent } from '@/data/artMovements';
import { supabase } from '@/integrations/supabase/client';

export interface TranslatedContent {
  summary?: string;
  characteristics?: string[];
  artists?: { name: string; years: string; description: string }[];
  tattooTips?: {
    intro: string;
    design: string[];
    technical: string[];
    inspiration: string;
  };
  quiz?: { question: string; options: string[] }[];
  origin?: { explanation: string };
  artworks?: { title: string; description: string }[];
}

export const useTranslatedContent = (movementId: string, content: MovementContent | undefined) => {
  const { language } = useLanguage();
  const [translated, setTranslated] = useState<TranslatedContent | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTranslation = useCallback(async () => {
    if (!content || language === 'en') {
      setTranslated(null);
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('translate-content', {
        body: { movementId, language, content },
      });

      if (error) throw error;
      if (data?.translated) {
        setTranslated(data.translated);
      }
    } catch (err) {
      console.error('Translation failed:', err);
    }

    setLoading(false);
  }, [movementId, language, content]);

  useEffect(() => {
    fetchTranslation();
  }, [fetchTranslation]);

  return { translated, loading, isTranslating: loading && language !== 'en' };
};
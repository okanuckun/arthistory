import { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MovementContent } from '@/data/artMovements';
import { getTranslation, TranslatedMovement } from '@/data/translations';

export type TranslatedContent = TranslatedMovement;

export const useTranslatedContent = (movementId: string, content: MovementContent | undefined) => {
  const { language } = useLanguage();

  const translated = useMemo(() => {
    if (!content || language === 'en') return null;
    return getTranslation(movementId, language);
  }, [movementId, language, content]);

  return { translated, loading: false, isTranslating: false };
};

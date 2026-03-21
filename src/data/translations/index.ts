import { MovementTranslations } from './types';
import { tr } from './tr';
import { es } from './es';
import { ko } from './ko';

export type { TranslatedMovement, MovementTranslations } from './types';

export const translations: Record<string, MovementTranslations> = {
  tr,
  es,
  ko,
};

export const getTranslation = (movementId: string, language: string) => {
  if (language === 'en') return null;
  return translations[language]?.[movementId] ?? null;
};

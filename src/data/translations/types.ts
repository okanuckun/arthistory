export interface TranslatedMovement {
  summary: string;
  characteristics: string[];
  artists: { name: string; years: string; description: string }[];
  tattooTips: {
    intro: string;
    design: string[];
    technical: string[];
    inspiration: string;
  };
  quiz: { question: string; options: string[] }[];
  origin?: { explanation: string };
  artworks: { title: string; description: string }[];
}

export type MovementTranslations = Record<string, TranslatedMovement>;

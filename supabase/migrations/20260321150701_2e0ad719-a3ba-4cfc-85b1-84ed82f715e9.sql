
-- Create table for caching AI-translated content
CREATE TABLE public.content_translations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  movement_id TEXT NOT NULL,
  language TEXT NOT NULL,
  field TEXT NOT NULL,
  translated_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(movement_id, language, field)
);

-- Enable RLS
ALTER TABLE public.content_translations ENABLE ROW LEVEL SECURITY;

-- Everyone can read translations (public content)
CREATE POLICY "Translations are publicly readable"
ON public.content_translations
FOR SELECT
USING (true);

-- Only service role can insert/update (via edge function)
-- No insert/update/delete policies for anon/authenticated users

-- Index for fast lookups
CREATE INDEX idx_translations_movement_lang ON public.content_translations(movement_id, language);

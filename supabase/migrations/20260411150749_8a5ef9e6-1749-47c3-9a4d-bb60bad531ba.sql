
CREATE TABLE public.app_update_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  update_id uuid REFERENCES public.app_updates(id) ON DELETE CASCADE NOT NULL,
  language text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (update_id, language)
);

ALTER TABLE public.app_update_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Translations are publicly readable"
  ON public.app_update_translations
  FOR SELECT
  TO authenticated
  USING (true);

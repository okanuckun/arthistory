CREATE TABLE public.movement_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  movement_id text NOT NULL,
  user_id uuid NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.movement_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view comments"
  ON public.movement_comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own comments"
  ON public.movement_comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON public.movement_comments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

ALTER PUBLICATION supabase_realtime ADD TABLE public.movement_comments;
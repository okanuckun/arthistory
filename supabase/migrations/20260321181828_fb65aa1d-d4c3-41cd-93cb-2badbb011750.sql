
-- App updates / changelog table
CREATE TABLE public.app_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  version text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.app_updates ENABLE ROW LEVEL SECURITY;

-- Everyone can read updates
CREATE POLICY "Updates are publicly readable"
  ON public.app_updates FOR SELECT
  TO authenticated
  USING (true);

-- Track which updates a user has seen
CREATE TABLE public.user_update_reads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  update_id uuid NOT NULL REFERENCES public.app_updates(id) ON DELETE CASCADE,
  read_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, update_id)
);

ALTER TABLE public.user_update_reads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reads"
  ON public.user_update_reads FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reads"
  ON public.user_update_reads FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Enable realtime for app_updates so new updates push instantly
ALTER PUBLICATION supabase_realtime ADD TABLE public.app_updates;

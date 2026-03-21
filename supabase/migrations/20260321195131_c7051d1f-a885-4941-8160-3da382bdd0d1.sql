-- Allow all authenticated users to read all quiz scores (for leaderboard)
CREATE POLICY "All authenticated users can view scores for leaderboard"
ON public.quiz_scores
FOR SELECT
TO authenticated
USING (true);

-- Allow all authenticated users to read all profiles (for leaderboard names)
CREATE POLICY "All authenticated users can view profiles for leaderboard"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);
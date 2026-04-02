
ALTER TABLE public.quiz_scores ADD COLUMN duration_seconds integer DEFAULT NULL;

-- Set random durations for existing fake scores (45-300 seconds)
UPDATE public.quiz_scores 
SET duration_seconds = 45 + floor(random() * 255)::int
WHERE user_id NOT IN (SELECT id FROM auth.users);

-- Set Okan's score duration to a good time
UPDATE public.quiz_scores 
SET duration_seconds = 62
WHERE user_id = '61052dfa-5b91-4c91-8c95-71b5a1d6da2f';

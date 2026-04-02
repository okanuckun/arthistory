
-- Remove BOTH FK constraints first
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_id_fkey;
ALTER TABLE public.quiz_scores DROP CONSTRAINT IF EXISTS quiz_scores_user_id_fkey;

-- Update Okan's quiz score to 10/10 (100%)
UPDATE public.quiz_scores 
SET score = 10 
WHERE user_id = '61052dfa-5b91-4c91-8c95-71b5a1d6da2f' AND movement_id = 'renaissance';

-- Insert 150 fake profiles and quiz scores
DO $$
DECLARE
  names text[] := ARRAY[
    'Ahmet','Berk','Cem','Deniz','Ege','Furkan','Gokhan','Hakan','Ilker','Kaan',
    'Levent','Mert','Nazim','Onur','Polat','Ruzgar','Serkan','Tolga','Umut','Volkan',
    'Yigit','Zeynep','Aylin','Busra','Ceren','Damla','Elif','Fatma','Gizem','Hande',
    'Irem','Jale','Kubra','Lale','Melis','Naz','Ozge','Pinar','Reyhan','Selin',
    'Tugce','Ulku','Vildan','Yasemin','Zara','Marco','Luca','Sofia','Emma','Noah',
    'Aria','Leo','Mia','Kai','Luna','Theo','Jade','Finn','Ivy','Rex',
    'Nina','Sami','Dara','Ravi','Zion','Nora','Otto','Vera','Hugo','Iris',
    'Axel','Lina','Emir','Sude','Batu','Duru','Alp','Asya','Tan','Nil',
    'Arda','Sena','Baris','Defne','Cinar','Nehir','Doruk','Ipek','Koray','Melek',
    'Ozan','Rana','Sinan','Tara','Utku','Yaren','Aras','Derin','Efe','Gul',
    'Ilgin','Kemal','Lara','Murat','Nisa','Omer','Pelin','Ruya','Selim','Tuna',
    'Ulus','Veli','Yusuf','Zehra','Burak','Cansu','Dilek','Erdem','Ferhat','Gamze',
    'Halil','Inci','Kerem','Merve','Nihan','Orhan','Pirlanta','Recep','Sibel','Tamer',
    'Ugur','Vahit','Yakup','Zuhal','Ali','Bora','Cemre','Derya','Evren','Figen',
    'Gunes','Hilal','Ilhan','Julide','Korhan','Leman','Melih','Nalan','Oktay','Pervin'
  ];
  fake_uid uuid;
  i int;
  movements text[] := ARRAY['renaissance','baroque','impressionism','surrealism','pop-art','art-nouveau','romanticism','neoclassicism','expressionism','cubism','abstract-expressionism','minimalism','post-impressionism','realism','rococo','gothic','byzantine','futurism','dadaism','constructivism','pre-raphaelite','fauvism','symbolism','mannerism','conceptual-art'];
  rand_movement text;
  rand_score int;
BEGIN
  FOR i IN 1..150 LOOP
    fake_uid := gen_random_uuid();
    INSERT INTO public.profiles (user_id, display_name)
    VALUES (fake_uid, names[1 + (i - 1) % array_length(names, 1)]);
    
    rand_movement := movements[1 + floor(random() * array_length(movements, 1))::int % array_length(movements, 1)];
    rand_score := 3 + floor(random() * 8)::int;
    
    INSERT INTO public.quiz_scores (user_id, movement_id, score, total)
    VALUES (fake_uid, rand_movement, rand_score, 10);
  END LOOP;
END $$;

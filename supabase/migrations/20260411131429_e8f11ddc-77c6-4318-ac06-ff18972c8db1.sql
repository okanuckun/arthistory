
-- 1. Clean orphaned records first
DELETE FROM public.quiz_scores
WHERE user_id NOT IN (SELECT id FROM auth.users);

DELETE FROM public.notification_preferences
WHERE user_id NOT IN (SELECT id FROM auth.users);

DELETE FROM public.movement_comments
WHERE user_id NOT IN (SELECT id FROM auth.users);

DELETE FROM public.profiles
WHERE user_id NOT IN (SELECT id FROM auth.users);

-- 2. Fix handle_new_user with ON CONFLICT
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', 'Learner'))
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- 3. Fix handle_new_user_notifications with ON CONFLICT
CREATE OR REPLACE FUNCTION public.handle_new_user_notifications()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.notification_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- 4. Make send_welcome_email_on_signup fail-safe (no-op if net is missing)
CREATE OR REPLACE FUNCTION public.send_welcome_email_on_signup()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Skip if pg_net extension is not available
  IF to_regnamespace('net') IS NULL THEN
    RETURN NEW;
  END IF;
  
  BEGIN
    PERFORM net.http_post(
      url := current_setting('app.settings.supabase_url', true) || '/functions/v1/send-welcome-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.supabase_anon_key', true)
      ),
      body := jsonb_build_object('mode', 'single', 'user_id', NEW.user_id)
    );
  EXCEPTION WHEN OTHERS THEN
    RAISE LOG 'Welcome email trigger failed for user %: %', NEW.user_id, SQLERRM;
  END;
  
  RETURN NEW;
END;
$$;

-- 5. Create triggers on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

DROP TRIGGER IF EXISTS on_auth_user_created_notifications ON auth.users;
CREATE TRIGGER on_auth_user_created_notifications
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_notifications();

-- 6. Create trigger for welcome email on profiles (fail-safe)
DROP TRIGGER IF EXISTS on_profile_created_send_welcome ON public.profiles;
CREATE TRIGGER on_profile_created_send_welcome
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.send_welcome_email_on_signup();

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  displayName: string | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  displayName: null,
  loading: true,
  signUp: async () => ({ error: null }),
  signIn: async () => ({ error: null }),
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDisplayName = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('display_name')
      .eq('user_id', userId)
      .single();
    setDisplayName(data?.display_name || null);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(() => fetchDisplayName(session.user.id), 0);
      } else {
        setDisplayName(null);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchDisplayName(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    // First, try signup without trigger dependency
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: name },
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      // If trigger fails, the auth error message is "Database error saving new user"
      // In that case, the user may actually be created — check and handle
      if (error.message.includes('Database error')) {
        // Try signing in — user might have been created despite trigger error
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          return { error: 'Sign up failed. Please try again.' };
        }

        // User exists, ensure profile
        if (signInData.user) {
          await ensureProfileExists(signInData.user.id, name);
        }
        return { error: null };
      }
      return { error: error.message };
    }

    // Ensure profile exists (fallback if trigger didn't fire or failed silently)
    if (data.user) {
      await ensureProfileExists(data.user.id, name);
    }

    return { error: null };
  };

  const ensureProfileExists = async (userId: string, name: string) => {
    try {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle();

      if (!existingProfile) {
        await supabase.from('profiles').upsert({
          user_id: userId,
          display_name: name,
        }, { onConflict: 'user_id' });
      }

      const { data: existingNotif } = await supabase
        .from('notification_preferences')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle();

      if (!existingNotif) {
        await supabase.from('notification_preferences').upsert({
          user_id: userId,
        }, { onConflict: 'user_id' });
      }
    } catch (err) {
      console.error('Failed to ensure profile exists:', err);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message || null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, displayName, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

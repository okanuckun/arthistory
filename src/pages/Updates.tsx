import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import { Sparkles, Check } from 'lucide-react';

interface AppUpdate {
  id: string;
  title: string;
  description: string;
  version: string | null;
  created_at: string;
}

interface Translation {
  update_id: string;
  title: string;
  description: string;
}

const Updates = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [updates, setUpdates] = useState<AppUpdate[]>([]);
  const [translations, setTranslations] = useState<Map<string, Translation>>(new Map());
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const queries: Promise<any>[] = [
        supabase.from('app_updates').select('*').order('created_at', { ascending: false }),
        supabase.from('user_update_reads').select('update_id').eq('user_id', user.id),
      ];

      // Fetch translations for non-English languages
      if (language !== 'en') {
        queries.push(
          supabase
            .from('app_update_translations')
            .select('update_id, title, description')
            .eq('language', language)
        );
      }

      const results = await Promise.all(queries);
      const updatesData = results[0].data || [];
      const readsData = results[1].data || [];

      setUpdates(updatesData);
      setReadIds(new Set(readsData.map((r: any) => r.update_id)));

      if (language !== 'en' && results[2]?.data) {
        const transMap = new Map<string, Translation>();
        for (const tr of results[2].data) {
          transMap.set(tr.update_id, tr);
        }
        setTranslations(transMap);
      } else {
        setTranslations(new Map());
      }

      setLoading(false);

      // Mark all unread as read
      const readSet = new Set(readsData.map((r: any) => r.update_id));
      const unreadIds = updatesData
        .filter((u: AppUpdate) => !readSet.has(u.id))
        .map((u: AppUpdate) => ({ user_id: user.id, update_id: u.id }));

      if (unreadIds.length > 0) {
        await supabase.from('user_update_reads').insert(unreadIds);
      }
    };

    fetchData();
  }, [user, language]);

  // Listen for new updates in realtime
  useEffect(() => {
    const channel = supabase
      .channel('app-updates-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'app_updates' }, (payload) => {
        setUpdates(prev => [payload.new as AppUpdate, ...prev]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const getTitle = (update: AppUpdate) => {
    if (language !== 'en') {
      const tr = translations.get(update.id);
      if (tr) return tr.title;
    }
    return update.title;
  };

  const getDescription = (update: AppUpdate) => {
    if (language !== 'en') {
      const tr = translations.get(update.id);
      if (tr) return tr.description;
    }
    return update.description;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="w-5 h-5 text-gold" />
          <h1 className="font-display text-2xl text-foreground">{t('updates.title')}</h1>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-card rounded-lg animate-pulse" />
            ))}
          </div>
        ) : updates.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground font-body">
            {t('updates.empty')}
          </div>
        ) : (
          <div className="space-y-4">
            {updates.map((update, index) => {
              const isRead = readIds.has(update.id);
              return (
                <div
                  key={update.id}
                  className="relative bg-card border border-border/50 rounded-lg p-5 transition-all duration-500 hover:shadow-md hover:shadow-black/10"
                  style={{
                    opacity: 0,
                    transform: 'translateY(12px)',
                    animation: `fadeSlideIn 500ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 80}ms forwards`,
                  }}
                >
                  {!isRead && (
                    <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gold" />
                  )}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {update.version && (
                          <span className="text-[10px] font-body uppercase tracking-widest text-gold bg-gold/10 px-2 py-0.5 rounded">
                            v{update.version}
                          </span>
                        )}
                        <span className="text-[11px] font-body text-muted-foreground">
                          {formatDate(update.created_at)}
                        </span>
                      </div>
                      <h3 className="font-display text-base text-foreground mb-1.5">{getTitle(update)}</h3>
                      <p className="text-sm font-body text-muted-foreground leading-relaxed">{getDescription(update)}</p>
                    </div>
                    {isRead && (
                      <Check className="w-4 h-4 text-muted-foreground/40 flex-shrink-0 mt-1" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Updates;

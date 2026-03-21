import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage, LANGUAGES, Language } from '@/contexts/LanguageContext';
import { LogOut, Sun, Moon, Trophy, Globe, Bell } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const { user, displayName, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const isLeaderboard = location.pathname === '/leaderboard';
  const isUpdates = location.pathname === '/updates';
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Fetch unread count
  useEffect(() => {
    if (!user) return;

    const fetchUnread = async () => {
      const [{ count: totalCount }, { data: reads }] = await Promise.all([
        supabase.from('app_updates').select('*', { count: 'exact', head: true }),
        supabase.from('user_update_reads').select('update_id').eq('user_id', user.id),
      ]);
      const readCount = reads?.length || 0;
      setUnreadCount(Math.max(0, (totalCount || 0) - readCount));
    };

    fetchUnread();

    // Listen for new updates
    const channel = supabase
      .channel('navbar-updates')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'app_updates' }, () => {
        setUnreadCount(prev => prev + 1);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  // Reset count when visiting updates page
  useEffect(() => {
    if (isUpdates) setUnreadCount(0);
  }, [isUpdates]);

  const currentLang = LANGUAGES.find(l => l.code === language);

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 pt-[max(0.75rem,env(safe-area-inset-top))] border-b border-border/50">
      <button
        onClick={() => navigate('/')}
        className="flex flex-col items-start hover:opacity-80 transition-opacity"
      >
        <span className="font-display text-sm text-gold tracking-tight leading-none">
          Monolith Studio
        </span>
        <span className="text-[9px] font-body tracking-[0.15em] uppercase text-muted-foreground leading-none mt-0.5">
          {t('nav.art_movements')}
        </span>
      </button>

      <div className="flex items-center gap-1 sm:gap-2">
        {/* Language selector */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all active:scale-[0.95] text-xs"
          >
            <span>{currentLang?.flag}</span>
          </button>
          {langOpen && (
            <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg shadow-black/20 py-1 z-50 min-w-[140px] max-h-[70vh] overflow-y-auto">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-xs font-body flex items-center gap-2 hover:bg-secondary transition-colors ${
                    language === lang.code ? 'text-gold' : 'text-foreground'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all active:scale-[0.95]"
        >
          {theme === 'gold' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        <button
          onClick={() => navigate(isUpdates ? '/' : '/updates')}
          className={`relative p-2 rounded-lg transition-all active:scale-[0.95] ${
            isUpdates ? 'text-gold bg-secondary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
          }`}
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-gold text-[9px] font-body font-semibold text-primary-foreground flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={() => navigate(isLeaderboard ? '/' : '/leaderboard')}
          className={`p-2 rounded-lg transition-all active:scale-[0.95] ${
            isLeaderboard ? 'text-gold bg-secondary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
          }`}
        >
          <Trophy className="w-4 h-4" />
        </button>

        {displayName && (
          <span className="text-xs font-body text-muted-foreground hidden sm:block">
            {displayName}
          </span>
        )}

        <button
          onClick={signOut}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all active:scale-[0.95]"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

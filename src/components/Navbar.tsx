import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage, LANGUAGES, Language } from '@/contexts/LanguageContext';
import { LogOut, Sun, Moon, Trophy, Globe } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { displayName, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const isLeaderboard = location.pathname === '/leaderboard';
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const currentLang = LANGUAGES.find(l => l.code === language);

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-border/50">
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

      <div className="flex items-center gap-2">
        {/* Language selector */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all active:scale-[0.95] text-xs"
          >
            <span>{currentLang?.flag}</span>
          </button>
          {langOpen && (
            <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg py-1 z-50 min-w-[140px]">
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

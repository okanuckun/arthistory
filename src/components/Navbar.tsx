import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { LogOut, Sun, Moon, Trophy } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { displayName, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isLeaderboard = location.pathname === '/leaderboard';

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
          Art Movements
        </span>
      </button>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all active:scale-[0.95]"
          title={theme === 'gold' ? 'Switch to monochrome' : 'Switch to gold'}
        >
          {theme === 'gold' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        <button
          onClick={() => navigate(isLeaderboard ? '/' : '/leaderboard')}
          className={`p-2 rounded-lg transition-all active:scale-[0.95] ${
            isLeaderboard
              ? 'text-gold bg-secondary'
              : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
          }`}
          title="Leaderboard"
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
          title="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

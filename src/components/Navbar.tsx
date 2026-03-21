import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { LogOut, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { displayName, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-border/50">
      <span className="font-display text-sm text-gold tracking-tight">
        Art Movements
      </span>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all active:scale-[0.95]"
          title={theme === 'gold' ? 'Switch to monochrome' : 'Switch to gold'}
        >
          {theme === 'gold' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
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

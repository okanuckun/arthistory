import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Palette, BookOpen, Sparkles } from 'lucide-react';

const Auth = () => {
  const { signUp, signIn } = useAuth();
  const [mode, setMode] = useState<'landing' | 'login' | 'signup'>('landing');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your name.');
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, name.trim());
      if (error) setError(error);
    } else {
      const { error } = await signIn(email, password);
      if (error) setError(error);
    }
    setLoading(false);
  };

  if (mode === 'landing') {
    return (
      <div className="min-h-screen flex flex-col justify-between px-6 py-12">
        {/* Hero */}
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <div className="opacity-0 animate-fade-up">
            <p className="text-[10px] font-body tracking-[0.35em] uppercase text-muted-foreground mb-5">
              For Tattoo Artists
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-medium text-warm-bright tracking-tight leading-[1.05] mb-3">
              The Great Art<br />
              <span className="text-gold italic">Movements</span>
            </h1>
            <p className="text-sm font-body text-muted-foreground leading-relaxed max-w-[280px] mb-8">
              Master art history from Renaissance to Contemporary — designed specifically for tattoo artists who want deeper roots in their craft.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4 mb-10 opacity-0 animate-fade-up" style={{ animationDelay: '150ms' }}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                <BookOpen className="w-3.5 h-3.5 text-gold" />
              </div>
              <div>
                <p className="text-sm font-body text-foreground font-medium">22 Art Movements</p>
                <p className="text-xs font-body text-muted-foreground">Deep-dive lessons with tattoo-specific insights</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                <Palette className="w-3.5 h-3.5 text-gold" />
              </div>
              <div>
                <p className="text-sm font-body text-foreground font-medium">Tattoo Tips & Techniques</p>
                <p className="text-xs font-body text-muted-foreground">Each movement includes design guidance for ink</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
              </div>
              <div>
                <p className="text-sm font-body text-foreground font-medium">Weekly New Content</p>
                <p className="text-xs font-body text-muted-foreground">A new movement unlocks every Sunday</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 opacity-0 animate-fade-up" style={{ animationDelay: '300ms' }}>
            <button
              onClick={() => setMode('signup')}
              className="w-full bg-primary text-primary-foreground rounded-lg py-3.5 text-sm font-body font-medium transition-all duration-200 hover:bg-primary/90 active:scale-[0.97] shadow-[0_2px_16px_hsl(var(--gold)/0.2)]"
            >
              Create Free Account
            </button>
            <button
              onClick={() => setMode('login')}
              className="w-full bg-secondary text-foreground border border-border rounded-lg py-3.5 text-sm font-body font-medium transition-all duration-200 hover:bg-secondary/80 active:scale-[0.97]"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 opacity-0 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <p className="text-[10px] font-body tracking-[0.2em] uppercase text-muted-foreground/50">
            Powered by{' '}
            <a
              href="https://monolithstudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-dim hover:text-gold transition-colors"
            >
              monolithstudio.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6">
      <div className="max-w-sm w-full mx-auto">
        {/* Back to landing */}
        <button
          onClick={() => { setMode('landing'); setError(''); }}
          className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors mb-8 tracking-wide"
        >
          ← Back
        </button>

        <div className="mb-8">
          <h1 className="font-display text-2xl text-warm-bright tracking-tight leading-[1.1] mb-1">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-sm font-body text-muted-foreground">
            {mode === 'login' ? 'Sign in to continue your journey' : 'Start your art history journey'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-body text-muted-foreground mb-1.5 tracking-wide uppercase">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={50}
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-body text-muted-foreground mb-1.5 tracking-wide uppercase">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-body text-muted-foreground mb-1.5 tracking-wide uppercase">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 pr-10 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm font-body text-destructive">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground rounded-lg py-3 text-sm font-body font-medium transition-all duration-200 hover:bg-primary/90 active:scale-[0.97] disabled:opacity-50 shadow-[0_2px_12px_hsl(var(--gold)/0.15)]"
          >
            {loading ? '...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm font-body text-muted-foreground">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
            className="text-gold hover:text-gold-light transition-colors"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;

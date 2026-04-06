import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage, LANGUAGES } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import { User, Instagram, Globe, FileText, Save, Check, ArrowLeft, Trophy, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Profile = () => {
  const { user, displayName } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const [name, setName] = useState(displayName || '');
  const [bio, setBio] = useState('');
  const [instagram, setInstagram] = useState('');
  const [website, setWebsite] = useState('');
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Quiz stats
  const [quizCount, setQuizCount] = useState(0);
  const [avgScore, setAvgScore] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('display_name, bio, instagram_url, website_url')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setName(data.display_name || '');
        setBio(data.bio || '');
        setInstagram(data.instagram_url || '');
        setWebsite(data.website_url || '');
      }
      setLoaded(true);
    };

    const fetchStats = async () => {
      const { data: scores } = await supabase
        .from('quiz_scores')
        .select('score, total')
        .eq('user_id', user.id);

      if (scores && scores.length > 0) {
        setQuizCount(scores.length);
        const avg = scores.reduce((sum, s) => sum + (s.score / s.total) * 100, 0) / scores.length;
        setAvgScore(Math.round(avg));
      }
    };

    fetchProfile();
    fetchStats();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    const { error } = await supabase
      .from('profiles')
      .update({
        display_name: name.trim() || 'Learner',
        bio,
        instagram_url: instagram,
        website_url: website,
      })
      .eq('user_id', user.id);

    setSaving(false);
    if (error) {
      toast.error('Failed to save profile');
    } else {
      toast.success(t('profile.saved'));
    }
  };

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-6">
        {/* Back */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-xs font-body text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t('detail.back')}
        </button>

        <h1 className="font-display text-2xl text-foreground tracking-tight mb-6">
          {t('profile.title')}
        </h1>

        {/* Avatar placeholder + name */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-secondary border-2 border-primary/30 flex items-center justify-center">
            <User className="w-7 h-7 text-gold" />
          </div>
          <div>
            <p className="font-display text-lg text-foreground">{displayName}</p>
            <p className="text-xs font-body text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-secondary rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-gold" />
              <span className="text-xs font-body text-muted-foreground">{t('profile.quizzes_completed')}</span>
            </div>
            <p className="font-display text-2xl text-foreground">{quizCount}</p>
          </div>
          <div className="bg-secondary rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-gold" />
              <span className="text-xs font-body text-muted-foreground">{t('profile.avg_score')}</span>
            </div>
            <p className="font-display text-2xl text-foreground">{avgScore}%</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Display Name */}
          <div>
            <label className="block text-xs font-body text-muted-foreground mb-1.5 tracking-wide uppercase">
              {t('auth.name')}
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={50}
              className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-body text-muted-foreground mb-1.5 tracking-wide uppercase">
              <FileText className="w-3.5 h-3.5" />
              {t('profile.bio')}
            </label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              maxLength={300}
              rows={3}
              className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow resize-none"
              placeholder={t('profile.bio.placeholder')}
            />
            <p className="text-[10px] font-body text-muted-foreground text-right mt-1">{bio.length}/300</p>
          </div>

          {/* Instagram */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-body text-muted-foreground mb-1.5 tracking-wide uppercase">
              <Instagram className="w-3.5 h-3.5" />
              {t('profile.instagram')}
            </label>
            <input
              type="text"
              value={instagram}
              onChange={e => setInstagram(e.target.value)}
              maxLength={100}
              className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
              placeholder={t('profile.instagram.placeholder')}
            />
          </div>

          {/* Website */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-body text-muted-foreground mb-1.5 tracking-wide uppercase">
              <Globe className="w-3.5 h-3.5" />
              {t('profile.website')}
            </label>
            <input
              type="text"
              value={website}
              onChange={e => setWebsite(e.target.value)}
              maxLength={200}
              className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
              placeholder={t('profile.website.placeholder')}
            />
          </div>

          {/* Language preference */}
          <div>
            <label className="block text-xs font-body text-muted-foreground mb-1.5 tracking-wide uppercase">
              {t('auth.language')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLanguage(l.code)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-body transition-all ${
                    language === l.code
                      ? 'border-primary bg-primary/10 text-gold'
                      : 'border-border bg-secondary text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg py-3 text-sm font-body font-medium transition-all duration-200 hover:bg-primary/90 active:scale-[0.97] disabled:opacity-50 shadow-[0_2px_12px_hsl(var(--gold)/0.15)]"
          >
            {saving ? (
              <>{t('profile.saving')}</>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {t('profile.save')}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

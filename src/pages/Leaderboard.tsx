import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { artMovements } from '@/data/artMovements';
import Navbar from '@/components/Navbar';
import { Trophy, Medal, Clock, ArrowUpDown } from 'lucide-react';

interface UserScore {
  userId: string;
  displayName: string;
  totalScore: number;
  totalPossible: number;
  totalDuration: number;
  movementScores: Record<string, { score: number; total: number; duration: number | null }>;
}

type SortMode = 'score' | 'time';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<UserScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>('score');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const [scoresRes, profilesRes] = await Promise.all([
        supabase.from('quiz_scores').select('user_id, movement_id, score, total, duration_seconds'),
        supabase.from('profiles').select('user_id, display_name'),
      ]);

      if (!scoresRes.data || !profilesRes.data) return;

      const profileMap: Record<string, string> = {};
      profilesRes.data.forEach(p => { profileMap[p.user_id] = p.display_name; });

      const userMap: Record<string, UserScore> = {};
      scoresRes.data.forEach(row => {
        if (!userMap[row.user_id]) {
          userMap[row.user_id] = {
            userId: row.user_id,
            displayName: profileMap[row.user_id] ?? 'Anonymous',
            totalScore: 0,
            totalPossible: 0,
            totalDuration: 0,
            movementScores: {},
          };
        }
        userMap[row.user_id].totalScore += row.score;
        userMap[row.user_id].totalPossible += row.total;
        userMap[row.user_id].totalDuration += (row.duration_seconds ?? 0);
        userMap[row.user_id].movementScores[row.movement_id] = {
          score: row.score,
          total: row.total,
          duration: row.duration_seconds,
        };
      });

      setLeaderboard(Object.values(userMap));
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    if (sortMode === 'score') {
      const aPercent = a.totalPossible ? a.totalScore / a.totalPossible : 0;
      const bPercent = b.totalPossible ? b.totalScore / b.totalPossible : 0;
      if (bPercent !== aPercent) return bPercent - aPercent;
      // Same score percentage → faster time wins
      return (a.totalDuration || Infinity) - (b.totalDuration || Infinity);
    } else {
      // Sort by time (fastest first), only among those with scores
      const aTime = a.totalDuration || Infinity;
      const bTime = b.totalDuration || Infinity;
      if (aTime !== bTime) return aTime - bTime;
      // Same time → higher score wins
      const aPercent = a.totalPossible ? a.totalScore / a.totalPossible : 0;
      const bPercent = b.totalPossible ? b.totalScore / b.totalPossible : 0;
      return bPercent - aPercent;
    }
  });

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '—';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-4 h-4 text-yellow-400" />;
    if (index === 1) return <Medal className="w-4 h-4 text-slate-300" />;
    if (index === 2) return <Medal className="w-4 h-4 text-amber-600" />;
    return <span className="text-xs font-body text-muted-foreground w-4 text-center">{index + 1}</span>;
  };

  const getScoreColor = (score: number, total: number) => {
    const pct = score / total;
    if (pct === 1) return 'text-emerald-400';
    if (pct >= 0.7) return 'text-gold';
    if (pct >= 0.4) return 'text-amber-500';
    return 'text-muted-foreground';
  };

  const completedMovements = artMovements.filter(m => m.content);

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <header className="max-w-3xl mx-auto px-6 pt-12 pb-10">
          <div className="opacity-0 animate-fade-up">
            <p className="text-xs font-body tracking-[0.25em] uppercase text-muted-foreground mb-3">
              Community Rankings
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-medium text-warm-bright tracking-tight leading-[1.05]">
              The Great Art<br />
              <span className="text-gold italic">Leaderboard</span>
            </h1>
          </div>
          <div className="flex items-center justify-between mt-8">
            <div className="h-px bg-border flex-1 opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }} />
            <button
              onClick={() => setSortMode(prev => prev === 'score' ? 'time' : 'score')}
              className="ml-4 flex items-center gap-2 text-xs font-body px-3 py-1.5 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all active:scale-[0.97] opacity-0 animate-fade-in"
              style={{ animationDelay: '500ms' }}
            >
              <ArrowUpDown className="w-3 h-3" />
              {sortMode === 'score' ? 'Sort by Time' : 'Sort by Score'}
            </button>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 pb-24">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : sortedLeaderboard.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-muted-foreground">No scores yet. Be the first to complete a quiz!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {sortedLeaderboard.map((user, i) => {
                const pct = user.totalPossible
                  ? Math.round((user.totalScore / user.totalPossible) * 100)
                  : 0;
                const isExpanded = expandedUser === user.userId;

                return (
                  <div
                    key={user.userId}
                    className="opacity-0 animate-fade-up border border-border rounded-lg overflow-hidden"
                    style={{ animationDelay: `${Math.min(i * 60, 600)}ms` }}
                  >
                    <button
                      className="w-full flex items-center gap-4 px-5 py-4 hover:bg-secondary/30 transition-colors text-left"
                      onClick={() => setExpandedUser(isExpanded ? null : user.userId)}
                    >
                      <div className="flex items-center justify-center w-5 shrink-0">
                        {getRankIcon(i)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm text-warm-bright truncate">{user.displayName}</p>
                        <p className="font-body text-xs text-muted-foreground mt-0.5">
                          {Object.keys(user.movementScores).length} quiz{Object.keys(user.movementScores).length !== 1 ? 'zes' : ''} completed
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-muted-foreground shrink-0">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs font-body">{formatDuration(user.totalDuration)}</span>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="font-display text-lg text-warm-bright">
                          {user.totalScore}
                          <span className="text-sm text-muted-foreground font-body">/{user.totalPossible}</span>
                        </p>
                        <p className={`text-xs font-body font-medium ${getScoreColor(user.totalScore, user.totalPossible)}`}>
                          {pct}%
                        </p>
                      </div>

                      <span className="text-muted-foreground text-xs ml-1">{isExpanded ? '▲' : '▼'}</span>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-border bg-surface-elevated/30 px-5 py-4">
                        <p className="text-xs font-body tracking-wider uppercase text-muted-foreground mb-3">
                          Movement Scores
                        </p>
                        <div className="space-y-2">
                          {completedMovements.map(movement => {
                            const ms = user.movementScores[movement.id];
                            return (
                              <div key={movement.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="flex gap-0.5">
                                    {movement.colorPalette.slice(0, 3).map((c, ci) => (
                                      <div key={ci} className="w-2 h-2 rounded-sm" style={{ backgroundColor: c }} />
                                    ))}
                                  </div>
                                  <span className="text-xs font-body text-muted-foreground">{movement.name}</span>
                                </div>
                                {ms ? (
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs font-body text-muted-foreground/60 flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {formatDuration(ms.duration)}
                                    </span>
                                    <span className={`text-xs font-body font-medium ${getScoreColor(ms.score, ms.total)}`}>
                                      {ms.score}/{ms.total}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-xs font-body text-muted-foreground/40">—</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Leaderboard;

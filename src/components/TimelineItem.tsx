import { ArtMovement } from '@/data/artMovements';
import { Lock, CheckCircle2, Award, CalendarClock } from 'lucide-react';

interface TimelineItemProps {
  movement: ArtMovement;
  onClick: (id: string) => void;
  index: number;
  quizScore?: { score: number; total: number };
}

const TimelineItem = ({ movement, onClick, index, quizScore }: TimelineItemProps) => {
  const isActive = movement.status === 'active';
  const isCompleted = movement.status === 'completed';
  const isLocked = movement.status === 'locked';

  return (
    <div
      className="opacity-0 animate-fade-up group relative flex items-start gap-6 cursor-pointer"
      style={{ animationDelay: `${Math.min(index * 80, 800)}ms` }}
      onClick={() => !isLocked && onClick(movement.id)}
    >
      <div className="flex flex-col items-center shrink-0 w-10">
        <div
          className={`w-3 h-3 rounded-full mt-2 transition-all duration-300 ${
            isActive
              ? 'bg-primary shadow-[0_0_12px_hsl(var(--gold)/0.5)]'
              : isCompleted
              ? 'bg-primary'
              : 'bg-muted-foreground/30'
          }`}
        />
      </div>

      <div
        className={`flex-1 pb-10 transition-all duration-300 ${
          isLocked ? 'opacity-35' : 'opacity-100'
        } ${!isLocked ? 'group-hover:translate-x-1' : ''}`}
      >
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-baseline gap-3">
            <span className="text-xs font-body tracking-widest uppercase text-muted-foreground">
              {String(movement.number).padStart(2, '0')}
            </span>
            <h3
              className={`font-display text-xl font-medium tracking-tight ${
                isActive ? 'text-gold-light' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {movement.name}
            </h3>
            {isLocked && <Lock className="w-3.5 h-3.5 text-muted-foreground/50" />}
          </div>

          {quizScore && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 shrink-0 ml-3">
              <Award className="w-3 h-3 text-gold" />
              <span className="text-[10px] font-body font-medium text-gold tracking-wide">
                {quizScore.score === quizScore.total ? 'Master' : 'Completed'}
              </span>
              <span className="text-[9px] font-body text-gold-dim">
                {quizScore.score}/{quizScore.total}
              </span>
            </span>
          )}
        </div>

        <p className="text-sm font-body text-muted-foreground mb-2">
          {movement.period}
        </p>

        <div className="flex gap-1 mb-2">
          {movement.colorPalette.map((color, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-sm ${isLocked ? 'grayscale opacity-40' : ''}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {isCompleted && !quizScore && (
          <span className="flex items-center gap-1.5 mt-1 text-xs font-body text-completed">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Completed
          </span>
        )}

        {isActive && (
          <span className="inline-block mt-1 text-xs font-body font-medium text-gold tracking-wider uppercase">
            Explore Now →
          </span>
        )}

        {isLocked && movement.releaseDate && (
          <span className="flex items-center gap-1.5 mt-1 text-[11px] font-body text-muted-foreground/70">
            <CalendarClock className="w-3 h-3" />
            {movement.releaseDate}
          </span>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;

import { ArtMovement } from '@/data/artMovements';
import Quiz from './Quiz';
import ArtworkGallery from './ArtworkGallery';
import { ArrowLeft, Palette, Wrench, Sparkles } from 'lucide-react';

interface MovementDetailProps {
  movement: ArtMovement;
  onBack: () => void;
  onQuizComplete: (movementId: string, score: number, total: number) => void;
  existingScore?: { score: number; total: number };
}

const MovementDetail = ({ movement, onBack, onQuizComplete, existingScore }: MovementDetailProps) => {
  const content = movement.content;
  if (!content) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-12 active:scale-[0.97]"
      >
        <ArrowLeft className="w-4 h-4" />
        Timeline
      </button>

      <div className="opacity-0 animate-fade-up mb-16">
        <span className="text-xs font-body tracking-[0.2em] uppercase text-muted-foreground block mb-3">
          {String(movement.number).padStart(2, '0')} — {movement.period}
        </span>
        <h1 className="font-display text-5xl md:text-6xl font-medium text-warm-bright tracking-tight leading-[1.1] mb-6">
          {movement.name}
        </h1>
        <div className="flex gap-1.5 mb-8">
          {movement.colorPalette.map((color, i) => (
            <div key={i} className="w-6 h-6 rounded-sm" style={{ backgroundColor: color }} />
          ))}
        </div>
        {content.origin && (
          <div className="mb-8 border border-primary/20 rounded-lg p-4 bg-surface-elevated">
            <p className="text-[10px] font-body tracking-[0.2em] uppercase text-gold/70 mb-2">
              {content.origin.type === 'reaction' ? '⚡ Emerged as a reaction to' : content.origin.type === 'evolution' ? '→ Evolved from' : '◎ Parallel to'}{' '}
              <span className="text-gold">{content.origin.targetName}</span>
            </p>
            <p className="text-sm font-body text-foreground/70 leading-relaxed italic" style={{ textWrap: 'pretty' as any }}>
              {content.origin.explanation}
            </p>
          </div>
        )}

        <p className="text-base font-body text-foreground/80 leading-relaxed max-w-prose" style={{ textWrap: 'pretty' as any }}>
          {content.summary}
        </p>
      </div>

      <section className="opacity-0 animate-fade-up mb-16" style={{ animationDelay: '150ms' }}>
        <h2 className="font-display text-2xl text-gold-light mb-6 tracking-tight">
          Key Characteristics
        </h2>
        <ul className="space-y-3">
          {content.characteristics.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm font-body text-foreground/75 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {content.artworks && content.artworks.length > 0 && (
        <ArtworkGallery artworks={content.artworks} movementName={movement.name} />
      )}

      <section className="opacity-0 animate-fade-up mb-16" style={{ animationDelay: '300ms' }}>
        <h2 className="font-display text-2xl text-gold-light mb-8 tracking-tight">
          Notable Artists
        </h2>
        <div className="space-y-6">
          {content.artists.map((artist, i) => (
            <div
              key={i}
              className="bg-surface-elevated rounded-lg p-6 border border-border/50 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-baseline gap-3 mb-2">
                <h3 className="font-display text-lg text-warm-bright">{artist.name}</h3>
                <span className="text-xs font-body text-muted-foreground">{artist.years}</span>
              </div>
              <p className="text-sm font-body text-foreground/70 leading-relaxed" style={{ textWrap: 'pretty' as any }}>
                {artist.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {content.tattooTips && (
        <section className="opacity-0 animate-fade-up mb-16" style={{ animationDelay: '400ms' }}>
          <h2 className="font-display text-2xl text-gold-light mb-3 tracking-tight">
            Tattoo Artist's Guide
          </h2>
          <p className="text-sm font-body text-foreground/60 leading-relaxed mb-8 max-w-prose" style={{ textWrap: 'pretty' as any }}>
            {content.tattooTips.intro}
          </p>

          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-4 h-4 text-gold" />
                <h3 className="font-display text-base text-warm-bright tracking-tight">Design Tips</h3>
              </div>
              <ul className="space-y-4">
                {content.tattooTips.design.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-body text-foreground/75 leading-relaxed">
                    <span className="text-xs font-body text-gold/60 shrink-0 mt-0.5 w-4">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="w-4 h-4 text-gold" />
                <h3 className="font-display text-base text-warm-bright tracking-tight">Technical Tips</h3>
              </div>
              <ul className="space-y-4">
                {content.tattooTips.technical.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-body text-foreground/75 leading-relaxed">
                    <span className="text-xs font-body text-gold/60 shrink-0 mt-0.5 w-4">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface-elevated rounded-lg p-6 border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-gold" />
                <h3 className="font-display text-base text-warm-bright tracking-tight">Modern Inspiration</h3>
              </div>
              <p className="text-sm font-body text-foreground/70 leading-relaxed" style={{ textWrap: 'pretty' as any }}>
                {content.tattooTips.inspiration}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="opacity-0 animate-fade-up" style={{ animationDelay: '550ms' }}>
        <Quiz
          questions={content.quiz}
          movementName={movement.name}
          movementId={movement.id}
          onComplete={onQuizComplete}
          existingScore={existingScore}
        />
      </section>
    </div>
  );
};

export default MovementDetail;

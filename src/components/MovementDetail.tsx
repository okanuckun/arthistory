import { ArtMovement } from '@/data/artMovements';
import Quiz from './Quiz';
import { ArrowLeft } from 'lucide-react';

interface MovementDetailProps {
  movement: ArtMovement;
  onBack: () => void;
}

const MovementDetail = ({ movement, onBack }: MovementDetailProps) => {
  const content = movement.content;
  if (!content) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-12 active:scale-[0.97]"
      >
        <ArrowLeft className="w-4 h-4" />
        Zaman Çizelgesi
      </button>

      {/* Header */}
      <div className="opacity-0 animate-fade-up mb-16">
        <span className="text-xs font-body tracking-[0.2em] uppercase text-muted-foreground block mb-3">
          {String(movement.number).padStart(2, '0')} — {movement.period}
        </span>
        <h1 className="font-display text-5xl md:text-6xl font-medium text-warm-bright tracking-tight leading-[1.1] mb-6">
          {movement.name}
        </h1>

        {/* Color palette */}
        <div className="flex gap-1.5 mb-8">
          {movement.colorPalette.map((color, i) => (
            <div key={i} className="w-6 h-6 rounded-sm" style={{ backgroundColor: color }} />
          ))}
        </div>

        <p className="text-base font-body text-foreground/80 leading-relaxed max-w-prose" style={{ textWrap: 'pretty' as any }}>
          {content.summary}
        </p>
      </div>

      {/* Characteristics */}
      <section className="opacity-0 animate-fade-up mb-16" style={{ animationDelay: '150ms' }}>
        <h2 className="font-display text-2xl text-gold-light mb-6 tracking-tight">
          Dönemin Özellikleri
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

      {/* Artists */}
      <section className="opacity-0 animate-fade-up mb-16" style={{ animationDelay: '300ms' }}>
        <h2 className="font-display text-2xl text-gold-light mb-8 tracking-tight">
          Öne Çıkan Sanatçılar
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

      {/* Quiz */}
      <section className="opacity-0 animate-fade-up" style={{ animationDelay: '450ms' }}>
        <Quiz questions={content.quiz} movementName={movement.name} />
      </section>
    </div>
  );
};

export default MovementDetail;

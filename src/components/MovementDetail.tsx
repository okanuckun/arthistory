import { ArtMovement } from '@/data/artMovements';
import Quiz from './Quiz';
import { ArrowLeft, Palette, Wrench, Sparkles, Volume2, Pause, Square, Loader2 } from 'lucide-react';
import { useTTS } from '@/hooks/use-tts';

interface MovementDetailProps {
  movement: ArtMovement;
  onBack: () => void;
  onQuizComplete: (movementId: string, score: number, total: number) => void;
  existingScore?: { score: number; total: number };
}

const MovementDetail = ({ movement, onBack, onQuizComplete, existingScore }: MovementDetailProps) => {
  const content = movement.content;
  const { speak, stop, pause, resume, isSpeaking, isPaused, isLoading } = useTTS();
  if (!content) return null;

  const buildReadText = () => {
    const parts: string[] = [];
    parts.push(movement.name + '. ' + content.summary);
    parts.push('Temel Özellikler. ' + content.characteristics.join('. '));
    parts.push('Önemli Sanatçılar. ' + content.artists.map(a => a.name + '. ' + a.description).join('. '));
    if (content.tattooTips) {
      parts.push('Dövme Sanatçısı Rehberi. ' + content.tattooTips.intro);
      parts.push('Tasarım İpuçları. ' + content.tattooTips.design.join('. '));
      parts.push('Teknik İpuçları. ' + content.tattooTips.technical.join('. '));
      parts.push(content.tattooTips.inspiration);
    }
    return parts.join('. ');
  };

  const handleSpeak = () => {
    if (isSpeaking && !isPaused) {
      pause();
    } else if (isSpeaking && isPaused) {
      resume();
    } else {
      speak(buildReadText());
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors active:scale-[0.97]"
        >
          <ArrowLeft className="w-4 h-4" />
          Timeline
        </button>
        <button
          onClick={handleSpeak}
          className={`flex items-center gap-2 text-sm font-body px-3 py-1.5 rounded-md transition-all active:scale-[0.97] ${
            isSpeaking
              ? 'bg-primary/10 text-primary border border-primary/20'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-border/50'
          }`}
        >
          {isSpeaking && !isPaused ? (
            <>
              <Pause className="w-4 h-4" />
              Duraklat
            </>
          ) : isSpeaking && isPaused ? (
            <>
              <Volume2 className="w-4 h-4" />
              Devam Et
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4" />
              Sayfayı Oku
            </>
          )}
        </button>
      </div>

      {isSpeaking && (
        <div className="flex justify-end mb-4">
          <button
            onClick={stop}
            className="flex items-center gap-1.5 text-xs font-body text-muted-foreground hover:text-destructive transition-colors active:scale-[0.97]"
          >
            <Square className="w-3 h-3" />
            Durdur
          </button>
        </div>
      )}

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
        <div className="space-y-4 max-w-prose">
          {content.summary.split('\n\n').map((paragraph, i) => (
            <p key={i} className="text-base font-body text-foreground/80 leading-relaxed" style={{ textWrap: 'pretty' as any }}>
              {paragraph}
            </p>
          ))}
        </div>
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

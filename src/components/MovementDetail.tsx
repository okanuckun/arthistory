import { ArtMovement } from '@/data/artMovements';
import Quiz from './Quiz';
import ArtworkGallery from './ArtworkGallery';
import { ArrowLeft, Palette, Wrench, Sparkles, Volume2, Pause, Square, Loader2, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslatedContent } from '@/hooks/use-translation';
import { useTTS } from '@/hooks/use-tts';

interface MovementDetailProps {
  movement: ArtMovement;
  onBack: () => void;
  onQuizComplete: (movementId: string, score: number, total: number) => void;
  existingScore?: { score: number; total: number };
}

const MovementDetail = ({ movement, onBack, onQuizComplete, existingScore }: MovementDetailProps) => {
  const content = movement.content;
  if (!content) return null;
  const { t } = useLanguage();
  const { translated } = useTranslatedContent(movement.id, content);
  const { speak, stop, pause, resume, restart, isSpeaking, isPaused, isLoading, hasResumable, getSavedProgress } = useTTS(movement.id);

  const summary = translated?.summary || content.summary;
  const summaryParagraphs = summary.split('\n\n').filter(Boolean);
  const characteristics = translated?.characteristics || content.characteristics;
  const artists = content.artists.map((a, i) => ({
    ...a,
    description: translated?.artists?.[i]?.description || a.description,
  }));
  const tattooTips = content.tattooTips ? {
    intro: translated?.tattooTips?.intro || content.tattooTips.intro,
    design: translated?.tattooTips?.design || content.tattooTips.design,
    technical: translated?.tattooTips?.technical || content.tattooTips.technical,
    inspiration: translated?.tattooTips?.inspiration || content.tattooTips.inspiration,
  } : null;
  const originExplanation = translated?.origin?.explanation || content.origin?.explanation;
  const artworksTranslated = content.artworks?.map((a, i) => ({
    ...a,
    description: translated?.artworks?.[i]?.description || a.description,
  }));

  const buildFullText = () => {
    return [
      summary,
      characteristics.join('. '),
      artists.map(a => `${a.name}. ${a.description}`).join(' '),
    ].join('\n\n');
  };

  const handleReadAloud = () => {
    if (isSpeaking && !isPaused) {
      pause();
      return;
    }
    if (isSpeaking && isPaused) {
      resume();
      return;
    }
    // Check for saved progress
    const saved = getSavedProgress();
    if (saved) {
      speak(buildFullText(), saved.chunkIndex);
    } else {
      speak(buildFullText());
    }
  };

  const handleRestartFromBeginning = () => {
    restart();
    speak(buildFullText(), 0);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-6 active:scale-[0.97]"
      >
        <ArrowLeft className="w-4 h-4" />
        {t('detail.back')}
      </button>

      <div className="flex flex-wrap gap-2 mb-12">
        <button
          onClick={handleReadAloud}
          disabled={isLoading}
          className="flex items-center gap-2 text-xs font-body px-3 py-1.5 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all active:scale-[0.97] disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : isSpeaking && !isPaused ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
          {isLoading ? t('detail.loading') : isSpeaking && !isPaused ? t('detail.pause') : isSpeaking && isPaused ? t('detail.resume') : hasResumable ? t('detail.continue') : t('detail.listen')}
        </button>
        {isSpeaking && (
          <button
            onClick={stop}
            className="flex items-center gap-2 text-xs font-body px-3 py-1.5 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-destructive/30 transition-all active:scale-[0.97]"
          >
            <Square className="w-3 h-3" />
            {t('detail.stop')}
          </button>
        )}
        {(hasResumable || isSpeaking) && (
          <button
            onClick={handleRestartFromBeginning}
            disabled={isLoading}
            className="flex items-center gap-2 text-xs font-body px-3 py-1.5 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all active:scale-[0.97] disabled:opacity-50"
          >
            <RotateCcw className="w-3 h-3" />
            {t('detail.restart')}
          </button>
        )}
      </div>

      <div className="opacity-0 animate-fade-up mb-16" data-tour="detail-summary">
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
              {content.origin.type === 'reaction' ? t('detail.origin.reaction') : content.origin.type === 'evolution' ? t('detail.origin.evolution') : t('detail.origin.parallel')}{' '}
              <span className="text-gold">{content.origin.targetName}</span>
            </p>
            <p className="text-sm font-body text-foreground/70 leading-relaxed italic" style={{ textWrap: 'pretty' as any }}>
              {originExplanation}
            </p>
          </div>
        )}

        <div className="max-w-prose space-y-5">
          {summaryParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base font-body text-foreground/80 leading-relaxed"
              style={{ textWrap: 'pretty' as any }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <section className="opacity-0 animate-fade-up mb-16" style={{ animationDelay: '150ms' }} data-tour="detail-characteristics">
        <h2 className="font-display text-2xl text-gold-light mb-6 tracking-tight">
          {t('detail.characteristics')}
        </h2>
        <ul className="space-y-3">
          {characteristics.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm font-body text-foreground/75 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {artworksTranslated && artworksTranslated.length > 0 && (
        <ArtworkGallery artworks={artworksTranslated} movementName={movement.name} />
      )}

      <section className="opacity-0 animate-fade-up mb-16" style={{ animationDelay: '300ms' }}>
        <h2 className="font-display text-2xl text-gold-light mb-8 tracking-tight">
          {t('detail.artists')}
        </h2>
        <div className="space-y-6">
          {artists.map((artist, i) => (
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

      {tattooTips && (
        <section className="opacity-0 animate-fade-up mb-16" style={{ animationDelay: '400ms' }}>
          <h2 className="font-display text-2xl text-gold-light mb-3 tracking-tight">
            {t('detail.tattoo_guide')}
          </h2>
          <p className="text-sm font-body text-foreground/60 leading-relaxed mb-8 max-w-prose" style={{ textWrap: 'pretty' as any }}>
            {tattooTips.intro}
          </p>

          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-4 h-4 text-gold" />
                <h3 className="font-display text-base text-warm-bright tracking-tight">{t('detail.design_tips')}</h3>
              </div>
              <ul className="space-y-4">
                {tattooTips.design.map((tip, i) => (
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
                <h3 className="font-display text-base text-warm-bright tracking-tight">{t('detail.technical_tips')}</h3>
              </div>
              <ul className="space-y-4">
                {tattooTips.technical.map((tip, i) => (
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
                <h3 className="font-display text-base text-warm-bright tracking-tight">{t('detail.inspiration')}</h3>
              </div>
              <p className="text-sm font-body text-foreground/70 leading-relaxed" style={{ textWrap: 'pretty' as any }}>
                {tattooTips.inspiration}
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
          translatedQuiz={translated?.quiz}
        />
      </section>
    </div>
  );
};

export default MovementDetail;

import { useEffect, useState, useRef } from 'react';
import { TourStep } from '@/hooks/use-tour';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface TourOverlayProps {
  active: boolean;
  step: TourStep;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
}

const TourOverlay = ({ active, step, currentStep, totalSteps, onNext, onPrev, onFinish }: TourOverlayProps) => {
  const { t } = useLanguage();
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !step) return;

    const el = document.querySelector(step.target);
    if (!el) {
      // If target not found, show centered
      setRect(null);
      return;
    }

    const updateRect = () => {
      const r = el.getBoundingClientRect();
      setRect(r);
    };

    updateRect();
    // Scroll element into view
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(updateRect, 400);

    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, [active, step, currentStep]);

  // Position tooltip
  useEffect(() => {
    if (!rect || !tooltipRef.current) return;

    const tt = tooltipRef.current.getBoundingClientRect();
    const padding = 12;
    const placement = step.placement || 'bottom';

    let top = 0;
    let left = 0;

    if (placement === 'bottom') {
      top = rect.bottom + padding;
      left = rect.left + rect.width / 2 - tt.width / 2;
    } else if (placement === 'top') {
      top = rect.top - tt.height - padding;
      left = rect.left + rect.width / 2 - tt.width / 2;
    } else if (placement === 'right') {
      top = rect.top + rect.height / 2 - tt.height / 2;
      left = rect.right + padding;
    } else {
      top = rect.top + rect.height / 2 - tt.height / 2;
      left = rect.left - tt.width - padding;
    }

    // Clamp to viewport
    left = Math.max(12, Math.min(left, window.innerWidth - tt.width - 12));
    top = Math.max(12, Math.min(top, window.innerHeight - tt.height - 12));

    setTooltipPos({ top, left });
  }, [rect, step]);

  if (!active || !step) return null;

  const isLast = currentStep === totalSteps - 1;
  const isFirst = currentStep === 0;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop with cutout */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <defs>
          <mask id="tour-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {rect && (
              <rect
                x={rect.left - 6}
                y={rect.top - 6}
                width={rect.width + 12}
                height={rect.height + 12}
                rx="8"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          x="0" y="0" width="100%" height="100%" 
          fill="hsl(0 0% 0% / 0.65)"
          mask="url(#tour-mask)"
          style={{ pointerEvents: 'all' }}
          onClick={onFinish}
        />
      </svg>

      {/* Highlight ring */}
      {rect && (
        <div
          className="absolute rounded-lg border-2 border-gold/60 shadow-[0_0_20px_hsl(var(--gold)/0.3)] pointer-events-none transition-all duration-300"
          style={{
            top: rect.top - 6,
            left: rect.left - 6,
            width: rect.width + 12,
            height: rect.height + 12,
          }}
        />
      )}

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="absolute z-10 w-[280px] sm:w-[320px] bg-card border border-border rounded-xl shadow-2xl shadow-black/30 p-5 transition-all duration-300 animate-fade-up"
        style={{
          top: rect ? tooltipPos.top : '50%',
          left: rect ? tooltipPos.left : '50%',
          transform: rect ? undefined : 'translate(-50%, -50%)',
        }}
      >
        {/* Close */}
        <button
          onClick={onFinish}
          className="absolute top-3 right-3 p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors active:scale-95"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Step indicator */}
        <div className="flex items-center gap-1.5 mb-3">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentStep ? 'w-5 bg-gold' : i < currentStep ? 'w-2 bg-gold/40' : 'w-2 bg-muted-foreground/20'
              }`}
            />
          ))}
        </div>

        <h3 className="font-display text-base text-warm-bright mb-1.5 leading-tight pr-6">
          {step.title}
        </h3>
        <p className="text-sm font-body text-foreground/70 leading-relaxed mb-4" style={{ textWrap: 'pretty' as any }}>
          {step.content}
        </p>

        <div className="flex items-center justify-between">
          <button
            onClick={onPrev}
            disabled={isFirst}
            className="flex items-center gap-1 text-xs font-body text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:pointer-events-none active:scale-95"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            {t('tour.prev')}
          </button>

          <button
            onClick={onNext}
            className="flex items-center gap-1.5 text-xs font-body font-medium px-4 py-2 rounded-lg bg-gold/90 text-primary-foreground hover:bg-gold transition-colors active:scale-[0.97]"
          >
            {isLast ? 'Başla!' : 'İleri'}
            {!isLast && <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourOverlay;

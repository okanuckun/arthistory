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

  // Position tooltip with smart placement fallback
  useEffect(() => {
    if (!tooltipRef.current) return;

    // Small delay to let tooltip render and get correct dimensions
    const raf = requestAnimationFrame(() => {
      if (!tooltipRef.current) return;
      const tt = tooltipRef.current.getBoundingClientRect();
      const gap = 12;
      const margin = 12; // increased margin for mobile safe areas
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (!rect) {
        // Centered fallback
        setTooltipPos({ top: vh / 2 - tt.height / 2, left: vw / 2 - tt.width / 2 });
        return;
      }

      // Try preferred placement, then fall back to one that fits
      const preferred = step.placement || 'bottom';
      const placements: Array<'bottom' | 'top' | 'right' | 'left'> = [preferred, 'bottom', 'top', 'right', 'left'];
      const seen = new Set<string>();

      let top = 0;
      let left = 0;
      let found = false;

      for (const p of placements) {
        if (seen.has(p)) continue;
        seen.add(p);

        let t = 0;
        let l = 0;

        if (p === 'bottom') {
          t = rect.bottom + gap;
          l = rect.left + rect.width / 2 - tt.width / 2;
        } else if (p === 'top') {
          t = rect.top - tt.height - gap;
          l = rect.left + rect.width / 2 - tt.width / 2;
        } else if (p === 'right') {
          t = rect.top + rect.height / 2 - tt.height / 2;
          l = rect.right + gap;
        } else {
          t = rect.top + rect.height / 2 - tt.height / 2;
          l = rect.left - tt.width - gap;
        }

        // Check if it fits within viewport
        if (t >= margin && t + tt.height <= vh - margin && l >= margin && l + tt.width <= vw - margin) {
          top = t;
          left = l;
          found = true;
          break;
        }
      }

      // If no placement fits perfectly, use preferred but clamp
      if (!found) {
        if (preferred === 'bottom' || preferred === 'top') {
          top = preferred === 'bottom' ? rect.bottom + gap : rect.top - tt.height - gap;
          left = rect.left + rect.width / 2 - tt.width / 2;
        } else {
          top = rect.top + rect.height / 2 - tt.height / 2;
          left = preferred === 'right' ? rect.right + gap : rect.left - tt.width - gap;
        }
      }

      // Always clamp to viewport with safe margins
      left = Math.max(margin, Math.min(left, vw - tt.width - margin));
      top = Math.max(margin, Math.min(top, vh - tt.height - margin));

      setTooltipPos({ top, left });
    });

    return () => cancelAnimationFrame(raf);
  }, [rect, step]);

  if (!active || !step) return null;

  const isLast = currentStep === totalSteps - 1;
  const isFirst = currentStep === 0;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden touch-none">
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
        className="absolute z-10 w-[calc(100vw-24px)] max-w-[280px] sm:max-w-[320px] bg-card border border-border rounded-xl shadow-2xl shadow-black/30 p-4 sm:p-5 transition-all duration-300 animate-fade-up"
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
            {isLast ? t('tour.finish') : t('tour.next')}
            {!isLast && <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourOverlay;

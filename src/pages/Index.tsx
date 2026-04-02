import { useState, useEffect } from 'react';
import { artMovements } from '@/data/artMovements';
import TimelineItem from '@/components/TimelineItem';
import MovementDetail from '@/components/MovementDetail';
import Navbar from '@/components/Navbar';
import TourOverlay from '@/components/TourOverlay';
import { useTour, useDetailTour, TourStep } from '@/hooks/use-tour';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

interface ScoreMap {
  [movementId: string]: { score: number; total: number };
}

const Index = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [scores, setScores] = useState<ScoreMap>({});

  const tourSteps: TourStep[] = [
    {
      target: '[data-tour="timeline-item"]',
      title: t('tour.home.timeline.title'),
      content: t('tour.home.timeline.content'),
      placement: 'right',
    },
    {
      target: '[data-tour="language"]',
      title: t('tour.home.language.title'),
      content: t('tour.home.language.content'),
      placement: 'bottom',
    },
    {
      target: '[data-tour="theme"]',
      title: t('tour.home.theme.title'),
      content: t('tour.home.theme.content'),
      placement: 'bottom',
    },
    {
      target: '[data-tour="updates"]',
      title: t('tour.home.updates.title'),
      content: t('tour.home.updates.content'),
      placement: 'bottom',
    },
    {
      target: '[data-tour="leaderboard"]',
      title: t('tour.home.leaderboard.title'),
      content: t('tour.home.leaderboard.content'),
      placement: 'bottom',
    },
  ];

  const detailTourSteps: TourStep[] = [
    {
      target: '[data-tour="detail-summary"]',
      title: t('tour.detail.summary.title'),
      content: t('tour.detail.summary.content'),
      placement: 'bottom',
    },
    {
      target: '[data-tour="detail-characteristics"]',
      title: t('tour.detail.characteristics.title'),
      content: t('tour.detail.characteristics.content'),
      placement: 'top',
    },
    {
      target: '[data-tour="detail-artists"]',
      title: t('tour.detail.artists.title'),
      content: t('tour.detail.artists.content'),
      placement: 'top',
    },
    {
      target: '[data-tour="detail-tattoo"]',
      title: t('tour.detail.tattoo.title'),
      content: t('tour.detail.tattoo.content'),
      placement: 'top',
    },
    {
      target: '[data-tour="detail-quiz"]',
      title: t('tour.detail.quiz.title'),
      content: t('tour.detail.quiz.content'),
      placement: 'top',
    },
  ];

  const tour = useTour(tourSteps);
  const detailTour = useDetailTour(detailTourSteps);

  // After homepage tour finishes, navigate into first movement for detail tour
  const handleHomeTourFinish = () => {
    tour.finish();
    if (!detailTour.isCompleted) {
      const firstActive = artMovements.find(m => m.status !== 'locked');
      if (firstActive) {
        setSelectedId(firstActive.id);
        // Detail tour will start via effect
        setTimeout(() => detailTour.start(), 1000);
      }
    }
  };

  useEffect(() => {
    if (!user) return;
    supabase
      .from('quiz_scores')
      .select('movement_id, score, total')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (data) {
          const map: ScoreMap = {};
          data.forEach(row => { map[row.movement_id] = { score: row.score, total: row.total }; });
          setScores(map);
        }
      });
  }, [user]);

  const handleQuizComplete = async (movementId: string, score: number, total: number, durationSeconds: number) => {
    if (!user) return;
    setScores(prev => ({ ...prev, [movementId]: { score, total } }));

    await supabase.from('quiz_scores').upsert(
      { user_id: user.id, movement_id: movementId, score, total, duration_seconds: durationSeconds },
      { onConflict: 'user_id,movement_id' }
    );
  };

  const selectedMovement = selectedId ? artMovements.find(m => m.id === selectedId) : null;

  if (selectedMovement && selectedMovement.content) {
    return (
      <>
        <Navbar />
        <MovementDetail
          movement={selectedMovement}
          onBack={() => { detailTour.finish(); setSelectedId(null); }}
          onQuizComplete={handleQuizComplete}
          existingScore={scores[selectedMovement.id]}
        />
        <TourOverlay
          active={detailTour.active}
          step={detailTour.step}
          currentStep={detailTour.currentStep}
          totalSteps={detailTour.totalSteps}
          onNext={detailTour.next}
          onPrev={detailTour.prev}
          onFinish={detailTour.finish}
        />
      </>
    );
  }

  const totalMovements = artMovements.length;
  const liveCount = artMovements.filter(m => m.status !== 'locked').length;
  const upcomingCount = totalMovements - liveCount;

  return (
    <>
      <Navbar />
      <TourOverlay
        active={tour.active}
        step={tour.step}
        currentStep={tour.currentStep}
        totalSteps={tour.totalSteps}
        onNext={tour.currentStep === tour.totalSteps - 1 ? handleHomeTourFinish : tour.next}
        onPrev={tour.prev}
        onFinish={handleHomeTourFinish}
      />
      <div className="min-h-screen">
        <header className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-6 sm:pb-10">
          <div className="opacity-0 animate-fade-up flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-10 gap-4">
            <div>
              <p className="text-xs font-body tracking-[0.25em] uppercase text-muted-foreground mb-2 sm:mb-3">
                {t('header.tagline')}
              </p>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-warm-bright tracking-tight leading-[1.05]">
                The Great Art<br />
                <span className="text-gold italic">Movements</span>
              </h1>
            </div>
            <div className="flex gap-6 sm:text-right opacity-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <div>
                <p className="font-display text-xl sm:text-2xl text-warm-bright">{totalMovements}</p>
                <p className="text-[10px] font-body tracking-wider uppercase text-muted-foreground">{t('header.total')}</p>
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl text-warm-bright">{liveCount}</p>
                <p className="text-[10px] font-body tracking-wider uppercase text-muted-foreground">{t('header.live')}</p>
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl text-warm-bright">{upcomingCount}</p>
                <p className="text-[10px] font-body tracking-wider uppercase text-muted-foreground">{t('header.soon')}</p>
              </div>
            </div>
          </div>
          <div className="h-px bg-border mb-2 opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }} />
        </header>

        <main className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />
            {artMovements.map((movement, i) => (
              <TimelineItem
                key={movement.id}
                movement={movement}
                onClick={setSelectedId}
                index={i}
                quizScore={scores[movement.id]}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Index;

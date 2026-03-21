import { useState } from 'react';
import { artMovements } from '@/data/artMovements';
import TimelineItem from '@/components/TimelineItem';
import MovementDetail from '@/components/MovementDetail';

const Index = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedMovement = selectedId
    ? artMovements.find(m => m.id === selectedId)
    : null;

  if (selectedMovement && selectedMovement.content) {
    return (
      <MovementDetail
        movement={selectedMovement}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  const totalMovements = artMovements.length;
  const completedCount = artMovements.filter(m => m.status === 'completed').length;
  const activeCount = artMovements.filter(m => m.status === 'active').length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="max-w-3xl mx-auto px-6 pt-16 pb-12">
        <div className="opacity-0 animate-fade-up flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-body tracking-[0.25em] uppercase text-muted-foreground mb-3">
              Sanat Tarihi Yolculuğu
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-medium text-warm-bright tracking-tight leading-[1.05]">
              Büyük Sanat<br />
              <span className="text-gold italic">Akımları</span>
            </h1>
          </div>
          <div className="flex gap-6 text-right opacity-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div>
              <p className="font-display text-2xl text-warm-bright">{totalMovements}</p>
              <p className="text-[10px] font-body tracking-wider uppercase text-muted-foreground">Akım</p>
            </div>
            <div>
              <p className="font-display text-2xl text-warm-bright">{completedCount + activeCount}</p>
              <p className="text-[10px] font-body tracking-wider uppercase text-muted-foreground">Yayında</p>
            </div>
            <div>
              <p className="font-display text-2xl text-warm-bright">{totalMovements - completedCount - activeCount}</p>
              <p className="text-[10px] font-body tracking-wider uppercase text-muted-foreground">Yakında</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-border mb-2 opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }} />
      </header>

      {/* Timeline */}
      <main className="max-w-3xl mx-auto px-6 pb-24">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />

          {artMovements.map((movement, i) => (
            <TimelineItem
              key={movement.id}
              movement={movement}
              onClick={setSelectedId}
              index={i}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;

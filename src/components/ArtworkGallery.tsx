import { useState } from 'react';
import { Artwork } from '@/data/artMovements';
import { X, MapPin, Palette, Calendar } from 'lucide-react';

interface ArtworkGalleryProps {
  artworks: Artwork[];
  movementName: string;
}

const typeLabel: Record<Artwork['type'], string> = {
  painting: 'Painting',
  sculpture: 'Sculpture',
  architecture: 'Architecture',
  drawing: 'Drawing',
  fresco: 'Fresco',
};

const ArtworkGallery = ({ artworks, movementName }: ArtworkGalleryProps) => {
  const [selected, setSelected] = useState<Artwork | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (imageUrl: string) => {
    setFailedImages(prev => new Set(prev).add(imageUrl));
  };

  return (
    <section className="opacity-0 animate-fade-up mb-16" style={{ animationDelay: '250ms' }}>
      <h2 className="font-display text-2xl text-gold-light mb-2 tracking-tight">
        Masterworks
      </h2>
      <p className="text-sm font-body text-muted-foreground mb-8">
        10 essential works that define the {movementName}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {artworks.map((artwork, i) => (
          <button
            key={i}
            onClick={() => setSelected(artwork)}
            className="group relative aspect-[3/4] rounded-lg overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] bg-surface-elevated"
          >
            {failedImages.has(artwork.imageUrl) ? (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-3">
                <Palette className="w-6 h-6 text-muted-foreground/40" />
                <span className="text-[10px] font-body text-muted-foreground/60 text-center leading-tight">
                  {artwork.title}
                </span>
              </div>
            ) : (
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => handleImageError(artwork.imageUrl)}
                loading="lazy"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <p className="font-display text-xs text-white leading-tight line-clamp-2">{artwork.title}</p>
              <p className="text-[10px] font-body text-white/70 mt-0.5">{artwork.artist}</p>
            </div>

            <div className="absolute top-2 right-2">
              <span className="text-[9px] font-body tracking-wider uppercase bg-black/50 text-white/80 px-1.5 py-0.5 rounded">
                {typeLabel[artwork.type]}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-3 md:p-8 animate-fade-in"
          onClick={() => setSelected(null)}
          style={{ paddingTop: 'max(12px, env(safe-area-inset-top))', paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
        >
          <div
            className="relative w-full max-w-4xl bg-background rounded-xl overflow-hidden border border-border/50 shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >

            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-10 p-2 rounded-full bg-black/60 text-white/80 hover:text-white transition-colors active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Image side */}
            <div className="shrink-0 md:w-1/2 bg-black flex items-center justify-center h-[35vh] md:h-auto md:min-h-[400px]">
              {failedImages.has(selected.imageUrl) ? (
                <div className="flex flex-col items-center gap-3 p-8">
                  <Palette className="w-12 h-12 text-muted-foreground/30" />
                  <p className="text-sm font-body text-muted-foreground/50 text-center">Image unavailable</p>
                </div>
              ) : (
                <img
                  src={selected.imageUrl}
                  alt={selected.title}
                  className="w-full h-full object-contain"
                  onError={() => handleImageError(selected.imageUrl)}
                />
              )}
            </div>

            {/* Info side */}
            <div className="md:w-1/2 p-5 md:p-8 overflow-y-auto flex-1 min-h-0">
              <span className="text-[10px] font-body tracking-[0.2em] uppercase text-gold/70 mb-1.5 block">
                {typeLabel[selected.type]}
              </span>
              <h3 className="font-display text-xl md:text-2xl text-warm-bright mb-0.5 leading-tight">
                {selected.title}
              </h3>
              <p className="font-display text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                {selected.artist}
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 md:mb-6 md:flex-col md:gap-3">
                <div className="flex items-center gap-2 text-xs md:text-sm font-body text-foreground/70">
                  <Calendar className="w-3.5 h-3.5 text-gold/60 shrink-0" />
                  {selected.year}
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm font-body text-foreground/70">
                  <Palette className="w-3.5 h-3.5 text-gold/60 shrink-0" />
                  <span className="line-clamp-1">{selected.medium}</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm font-body text-foreground/70">
                  <MapPin className="w-3.5 h-3.5 text-gold/60 shrink-0" />
                  <span className="line-clamp-1">{selected.location}</span>
                </div>
              </div>

              <div className="h-px bg-border mb-4 md:mb-6" />

              <p className="text-sm font-body text-foreground/75 leading-relaxed pb-4" style={{ textWrap: 'pretty' as any }}>
                {selected.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ArtworkGallery;

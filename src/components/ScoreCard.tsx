import { useRef, useEffect, useState } from 'react';
import { Download, Share2, X } from 'lucide-react';

interface ScoreCardProps {
  score: number;
  total: number;
  movementName: string;
  onClose: () => void;
}

const ScoreCard = ({ score, total, movementName, onClose }: ScoreCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = 1080;
    const h = 1080;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;

    // Background — deep warm dark
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#1a1612');
    bg.addColorStop(0.5, '#1e1a14');
    bg.addColorStop(1, '#141210');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Subtle radial glow
    const glow = ctx.createRadialGradient(w / 2, h * 0.42, 0, w / 2, h * 0.42, 400);
    glow.addColorStop(0, 'rgba(196, 164, 105, 0.08)');
    glow.addColorStop(1, 'rgba(196, 164, 105, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    // Decorative top line
    ctx.strokeStyle = 'rgba(196, 164, 105, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w * 0.15, 120);
    ctx.lineTo(w * 0.85, 120);
    ctx.stroke();

    // Small diamond at center of line
    const cx = w / 2;
    ctx.fillStyle = 'rgba(196, 164, 105, 0.5)';
    ctx.beginPath();
    ctx.moveTo(cx, 114);
    ctx.lineTo(cx + 6, 120);
    ctx.moveTo(cx, 126);
    ctx.lineTo(cx - 6, 120);
    ctx.lineTo(cx, 114);
    ctx.closePath();
    ctx.fill();

    // Eyebrow text
    ctx.fillStyle = 'rgba(196, 164, 105, 0.6)';
    ctx.font = '500 14px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '6px';
    ctx.fillText('QUIZ RESULT', cx, 170);

    // Movement name
    ctx.fillStyle = '#e8dcc8';
    ctx.font = 'italic 600 52px Georgia, serif';
    ctx.letterSpacing = '0px';
    ctx.fillText(movementName, cx, 260);

    // Score circle
    const scoreY = 500;
    const radius = 150;

    // Circle background
    ctx.beginPath();
    ctx.arc(cx, scoreY, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(196, 164, 105, 0.06)';
    ctx.fill();

    // Circle border
    ctx.beginPath();
    ctx.arc(cx, scoreY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(196, 164, 105, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Score arc (progress)
    const progress = score / total;
    ctx.beginPath();
    ctx.arc(cx, scoreY, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
    ctx.strokeStyle = '#c4a469';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Score number
    ctx.fillStyle = '#e8dcc8';
    ctx.font = '300 96px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${score}`, cx, scoreY - 10);

    // "out of X"
    ctx.fillStyle = 'rgba(196, 164, 105, 0.5)';
    ctx.font = '400 20px system-ui, sans-serif';
    ctx.fillText(`out of ${total}`, cx, scoreY + 50);

    // Message
    ctx.fillStyle = 'rgba(232, 220, 200, 0.7)';
    ctx.font = '400 22px system-ui, sans-serif';
    ctx.textBaseline = 'alphabetic';
    const message =
      score === total
        ? 'Perfect Score!'
        : score >= total * 0.6
        ? 'Well Done!'
        : 'Keep Learning!';
    ctx.fillText(message, cx, 710);

    // Bottom decorative line
    ctx.strokeStyle = 'rgba(196, 164, 105, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w * 0.15, 780);
    ctx.lineTo(w * 0.85, 780);
    ctx.stroke();

    // Brand
    ctx.fillStyle = '#c4a469';
    ctx.font = '600 28px Georgia, serif';
    ctx.fillText('The Great Art Movements', cx, 850);

    ctx.fillStyle = 'rgba(196, 164, 105, 0.5)';
    ctx.font = '400 16px system-ui, sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('BY MONOLITH STUDIO', cx, 890);

    // Website
    ctx.fillStyle = 'rgba(196, 164, 105, 0.4)';
    ctx.font = '400 15px system-ui, sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText('www.monolithstudio.com', cx, 940);

    // Bottom small diamond
    ctx.fillStyle = 'rgba(196, 164, 105, 0.3)';
    ctx.beginPath();
    ctx.moveTo(cx, 970);
    ctx.lineTo(cx + 5, 976);
    ctx.lineTo(cx, 982);
    ctx.lineTo(cx - 5, 976);
    ctx.closePath();
    ctx.fill();

    const url = canvas.toDataURL('image/jpeg', 0.95);
    setImageUrl(url);
  }, [score, total, movementName]);

  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `${movementName.replace(/\s+/g, '-').toLowerCase()}-score.jpg`;
    a.click();
  };

  const handleShare = async () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], 'score-card.jpg', { type: 'image/jpeg' });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: `${movementName} Quiz - ${score}/${total}`,
            text: `I scored ${score}/${total} on the ${movementName} quiz! The Great Art Movements by Monolith Studio`,
          });
        } catch {
          handleDownload();
        }
      } else {
        handleDownload();
      }
    }, 'image/jpeg', 0.95);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="relative max-w-sm w-full bg-background rounded-xl overflow-hidden border border-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/50 text-white/80 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <canvas ref={canvasRef} className="hidden" />

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Score card"
            className="w-full aspect-square object-cover"
          />
        )}

        <div className="flex gap-3 p-4">
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-body text-sm font-medium transition-all active:scale-[0.97] hover:bg-primary/90"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border text-foreground/80 font-body text-sm transition-all active:scale-[0.97] hover:bg-secondary"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;

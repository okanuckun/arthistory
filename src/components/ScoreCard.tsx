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

    // Instagram 4:5 portrait
    const w = 1080;
    const h = 1350;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;
    const cx = w / 2;

    // Background
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#1a1612');
    bg.addColorStop(0.5, '#1e1a14');
    bg.addColorStop(1, '#141210');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Subtle radial glow
    const glow = ctx.createRadialGradient(cx, h * 0.4, 0, cx, h * 0.4, 500);
    glow.addColorStop(0, 'rgba(196, 164, 105, 0.08)');
    glow.addColorStop(1, 'rgba(196, 164, 105, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    // Top decorative line
    ctx.strokeStyle = 'rgba(196, 164, 105, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w * 0.12, 140);
    ctx.lineTo(w * 0.88, 140);
    ctx.stroke();

    // Diamond at center of line
    ctx.fillStyle = 'rgba(196, 164, 105, 0.5)';
    ctx.beginPath();
    ctx.moveTo(cx, 133);
    ctx.lineTo(cx + 7, 140);
    ctx.lineTo(cx, 147);
    ctx.lineTo(cx - 7, 140);
    ctx.closePath();
    ctx.fill();

    // Eyebrow text
    ctx.fillStyle = 'rgba(196, 164, 105, 0.6)';
    ctx.font = '500 20px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '8px';
    ctx.fillText('QUIZ RESULT', cx, 200);

    // Movement name
    ctx.fillStyle = '#e8dcc8';
    ctx.font = 'italic 600 64px Georgia, serif';
    ctx.letterSpacing = '0px';
    ctx.fillText(movementName, cx, 300);

    // Score circle
    const scoreY = 580;
    const radius = 185;

    // Circle background
    ctx.beginPath();
    ctx.arc(cx, scoreY, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(196, 164, 105, 0.06)';
    ctx.fill();

    // Circle border
    ctx.beginPath();
    ctx.arc(cx, scoreY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(196, 164, 105, 0.25)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Score arc (progress)
    const progress = score / total;
    ctx.beginPath();
    ctx.arc(cx, scoreY, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
    ctx.strokeStyle = '#c4a469';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Score number
    ctx.fillStyle = '#e8dcc8';
    ctx.font = '300 120px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${score}`, cx, scoreY - 12);

    // "out of X"
    ctx.fillStyle = 'rgba(196, 164, 105, 0.5)';
    ctx.font = '400 28px system-ui, sans-serif';
    ctx.fillText(`out of ${total}`, cx, scoreY + 65);

    // Percentage
    const pct = Math.round(progress * 100);
    ctx.fillStyle = '#c4a469';
    ctx.font = '600 36px Georgia, serif';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(`${pct}%`, cx, 830);

    // Message
    ctx.fillStyle = 'rgba(232, 220, 200, 0.7)';
    ctx.font = '400 28px system-ui, sans-serif';
    const message =
      score === total
        ? 'Perfect Score!'
        : score >= total * 0.6
        ? 'Well Done!'
        : 'Keep Learning!';
    ctx.fillText(message, cx, 890);

    // Bottom decorative line
    ctx.strokeStyle = 'rgba(196, 164, 105, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w * 0.12, 960);
    ctx.lineTo(w * 0.88, 960);
    ctx.stroke();

    // Brand
    ctx.fillStyle = '#c4a469';
    ctx.font = '600 36px Georgia, serif';
    ctx.fillText('The Great Art Movements', cx, 1050);

    ctx.fillStyle = 'rgba(196, 164, 105, 0.5)';
    ctx.font = '400 22px system-ui, sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('BY MONOLITH STUDIO', cx, 1100);

    // Website
    ctx.fillStyle = 'rgba(196, 164, 105, 0.4)';
    ctx.font = '400 20px system-ui, sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('arthistory.monolithstudio.com', cx, 1180);

    // Bottom diamond
    ctx.fillStyle = 'rgba(196, 164, 105, 0.3)';
    ctx.beginPath();
    ctx.moveTo(cx, 1220);
    ctx.lineTo(cx + 6, 1227);
    ctx.lineTo(cx, 1234);
    ctx.lineTo(cx - 6, 1227);
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
            className="w-full"
            style={{ aspectRatio: '4/5' }}
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

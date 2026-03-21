import { useState } from 'react';
import { QuizQuestion } from '@/data/artMovements';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

interface QuizProps {
  questions: QuizQuestion[];
  movementName: string;
}

const Quiz = ({ questions, movementName }: QuizProps) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIndex: number, optionIndex: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const score = submitted
    ? questions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0)
    : 0;

  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="border-t border-border pt-12">
      <h2 className="font-display text-2xl text-gold-light mb-2 tracking-tight">
        Bilgi Testi
      </h2>
      <p className="text-sm font-body text-muted-foreground mb-8">
        {movementName} hakkında ne kadar öğrendin?
      </p>

      {submitted && (
        <div className="bg-surface-elevated rounded-lg p-6 mb-8 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-3xl text-warm-bright">
                {score}/{questions.length}
              </p>
              <p className="text-sm font-body text-muted-foreground mt-1">
                {score === questions.length
                  ? 'Mükemmel! Tüm soruları doğru bildin.'
                  : score >= questions.length * 0.6
                  ? 'İyi iş! Birkaç detayı gözden geçirebilirsin.'
                  : 'İçeriği tekrar okumayı deneyebilirsin.'}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors active:scale-[0.97]"
            >
              <RotateCcw className="w-4 h-4" />
              Tekrar Dene
            </button>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {questions.map((q, qIndex) => (
          <div key={qIndex}>
            <p className="text-sm font-body text-foreground/90 mb-3 leading-relaxed">
              <span className="text-gold-dim font-medium mr-2">{qIndex + 1}.</span>
              {q.question}
            </p>
            <div className="grid gap-2">
              {q.options.map((option, oIndex) => {
                const isSelected = answers[qIndex] === oIndex;
                const isCorrect = q.correctIndex === oIndex;
                const showResult = submitted;

                let stateClasses = 'border-border/50 hover:border-primary/30';
                if (isSelected && !showResult) {
                  stateClasses = 'border-primary bg-primary/10';
                }
                if (showResult && isCorrect) {
                  stateClasses = 'border-green-600/50 bg-green-900/10';
                }
                if (showResult && isSelected && !isCorrect) {
                  stateClasses = 'border-red-600/50 bg-red-900/10';
                }

                return (
                  <button
                    key={oIndex}
                    onClick={() => handleSelect(qIndex, oIndex)}
                    className={`text-left px-4 py-3 rounded-lg border text-sm font-body transition-all duration-200 active:scale-[0.98] ${stateClasses} ${
                      submitted ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {showResult && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                      )}
                      <span className={showResult && isCorrect ? 'text-green-400' : 'text-foreground/80'}>
                        {option}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className={`mt-8 px-8 py-3 rounded-lg font-body text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
            allAnswered
              ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_2px_12px_hsl(var(--gold)/0.2)]'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          Cevapları Kontrol Et
        </button>
      )}
    </div>
  );
};

export default Quiz;

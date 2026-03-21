import { useState } from 'react';
import { QuizQuestion } from '@/data/artMovements';
import { CheckCircle2, XCircle, RotateCcw, Share2 } from 'lucide-react';
import ScoreCard from './ScoreCard';

interface QuizProps {
  questions: QuizQuestion[];
  movementName: string;
  movementId: string;
  onComplete: (movementId: string, score: number, total: number) => void;
  existingScore?: { score: number; total: number };
}

const Quiz = ({ questions, movementName, movementId, onComplete, existingScore }: QuizProps) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(!!existingScore);
  const [showScoreCard, setShowScoreCard] = useState(false);

  const handleSelect = (qIndex: number, optionIndex: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) return;
    setSubmitted(true);
    const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0);
    onComplete(movementId, score, questions.length);
    setShowScoreCard(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const score = submitted && !existingScore
    ? questions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0)
    : existingScore?.score ?? 0;

  const allAnswered = Object.keys(answers).length === questions.length;

  if (existingScore && submitted && Object.keys(answers).length === 0) {
    return (
      <div className="border-t border-border pt-12">
        <h2 className="font-display text-2xl text-gold-light mb-2 tracking-tight">Knowledge Quiz</h2>
        <div className="bg-surface-elevated rounded-lg p-6 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-3xl text-warm-bright">
                {existingScore.score}/{existingScore.total}
              </p>
              <p className="text-sm font-body text-muted-foreground mt-1">
                You've already completed this quiz.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors active:scale-[0.97]"
            >
              <RotateCcw className="w-4 h-4" />
              Retake
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-border pt-12">
      <h2 className="font-display text-2xl text-gold-light mb-2 tracking-tight">Knowledge Quiz</h2>
      <p className="text-sm font-body text-muted-foreground mb-8">
        How much did you learn about {movementName}?
      </p>

      {submitted && Object.keys(answers).length > 0 && (
        <div className="bg-surface-elevated rounded-lg p-6 mb-8 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-3xl text-warm-bright">{score}/{questions.length}</p>
              <p className="text-sm font-body text-muted-foreground mt-1">
                {score === questions.length
                  ? 'Perfect! You got every question right.'
                  : score >= questions.length * 0.6
                  ? 'Good job! You might want to review a few details.'
                  : 'You might want to re-read the content above.'}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors active:scale-[0.97]"
            >
              <RotateCcw className="w-4 h-4" />
              Retake
            </button>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {questions.map((q, qIndex) => {
          const isSelected = (oIndex: number) => answers[qIndex] === oIndex;
          const showResult = submitted && Object.keys(answers).length > 0;

          return (
            <div key={qIndex}>
              <p className="text-sm font-body text-foreground/90 mb-3 leading-relaxed">
                <span className="text-gold-dim font-medium mr-2">{qIndex + 1}.</span>
                {q.question}
              </p>
              <div className="grid gap-2">
                {q.options.map((option, oIndex) => {
                  let stateClasses = 'border-border/50 hover:border-primary/30';
                  if (isSelected(oIndex) && !showResult) stateClasses = 'border-primary bg-primary/10';
                  if (showResult && q.correctIndex === oIndex) stateClasses = 'border-green-600/50 bg-green-950/20';
                  if (showResult && isSelected(oIndex) && q.correctIndex !== oIndex) stateClasses = 'border-red-600/50 bg-red-950/20';

                  return (
                    <button
                      key={oIndex}
                      onClick={() => handleSelect(qIndex, oIndex)}
                      className={`text-left px-4 py-3 rounded-lg border text-sm font-body transition-all duration-200 active:scale-[0.98] ${stateClasses} ${
                        submitted ? 'cursor-default' : 'cursor-pointer'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {showResult && q.correctIndex === oIndex && (
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                        )}
                        {showResult && isSelected(oIndex) && q.correctIndex !== oIndex && (
                          <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                        )}
                        <span className={showResult && q.correctIndex === oIndex ? 'text-green-400' : 'text-foreground/80'}>
                          {option}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
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
          Check Answers
        </button>
      )}
    </div>
  );
};

export default Quiz;

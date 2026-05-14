import { motion } from 'framer-motion';
import { Square, Trophy } from 'lucide-react';

export default function QuizHeader({ questionNumber, totalQuestions, score, difficulty, onStop }) {
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-heading uppercase tracking-widest text-muted-foreground">
            {difficulty}
          </span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">
            Q{questionNumber}/{totalQuestions}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-heading font-bold">{score}</span>
          </div>
          <button
            onClick={onStop}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors px-3 py-1.5 rounded-lg hover:bg-destructive/10"
          >
            <Square className="w-3 h-3 fill-current" />
            Stop
          </button>
        </div>
      </div>
      <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
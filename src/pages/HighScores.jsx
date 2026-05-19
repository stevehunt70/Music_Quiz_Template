import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy } from 'lucide-react';
import { getHighScores } from '../lib/quizStorage';

const decades = ['1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s'];
const difficulties = ['easy', 'medium', 'hard'];

const difficultyStyle = {
  easy: 'text-emerald-400',
  medium: 'text-amber-400',
  hard: 'text-rose-400',
};

export default function HighScores() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex items-center gap-3 mb-8">
          <Trophy className="w-6 h-6 text-amber-400" />
          <h1 className="text-3xl font-heading font-bold tracking-tight">High Scores</h1>
        </div>

        <div className="space-y-4">
          {decades.map((decade, i) => {
            const scores = getHighScores(decade);
            return (
              <motion.div
                key={decade}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="rounded-xl border border-border/50 bg-card overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-border/40">
                  <p className="font-heading font-bold text-foreground">{decade}</p>
                </div>
                <div className="divide-y divide-border/30">
                  {difficulties.map((diff) => (
                    <div key={diff} className="flex items-center justify-between px-4 py-3">
                      <span className={`text-sm font-heading font-semibold capitalize ${difficultyStyle[diff]}`}>
                        {diff}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-sm font-heading font-bold text-foreground">
                          {scores[diff]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const steps = [
  { emoji: '🎵', title: 'Choose a Decade', body: 'Pick a decade from the home screen — 1950s right through to the 2010s.' },
  { emoji: '🎯', title: 'Pick a Difficulty', body: 'Easy, Medium, or Hard. Each level has its own set of questions.' },
  { emoji: '❓', title: 'Answer the Questions', body: 'You\'ll be shown a question about a UK chart hit. Tap the answer you think is correct.' },
  { emoji: '✅', title: 'Get Instant Feedback', body: 'Green means correct, red means wrong. The right answer is NEVER revealed.' },
  { emoji: '🏆', title: 'Beat Your High Score', body: 'Your best score for each decade and difficulty is saved automatically.' },
];

export default function HowToPlay() {
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

        <h1 className="text-3xl font-heading font-bold tracking-tight mb-2">How to Play</h1>
        <p className="text-muted-foreground text-sm mb-8">Everything you need to know to get started.</p>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="flex gap-4 p-4 rounded-xl border border-border/50 bg-card"
            >
              <span className="text-2xl mt-0.5">{step.emoji}</span>
              <div>
                <p className="font-heading font-semibold text-foreground text-sm">{step.title}</p>
                <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const difficultyConfig = {
  easy: {
    gradient: 'from-emerald-500/20 to-emerald-600/5',
    border: 'border-emerald-500/30 hover:border-emerald-400/60',
    badge: 'bg-emerald-500/20 text-emerald-300',
    glow: 'hover:shadow-emerald-500/20',
    icon: '🎵',
    description: 'Perfect for beginners',
  },
  medium: {
    gradient: 'from-amber-500/20 to-amber-600/5',
    border: 'border-amber-500/30 hover:border-amber-400/60',
    badge: 'bg-amber-500/20 text-amber-300',
    glow: 'hover:shadow-amber-500/20',
    icon: '🎸',
    description: 'Test your knowledge',
  },
  hard: {
    gradient: 'from-rose-500/20 to-rose-600/5',
    border: 'border-rose-500/30 hover:border-rose-400/60',
    badge: 'bg-rose-500/20 text-rose-300',
    glow: 'hover:shadow-rose-500/20',
    icon: '🎼',
    description: 'For true music experts',
  },
};

export default function DifficultyCard({ difficulty, highScore, totalQuestions, onSelect, index }) {
  const config = difficultyConfig[difficulty];

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(difficulty)}
      className={`w-full p-6 rounded-2xl border bg-gradient-to-br ${config.gradient} ${config.border} ${config.glow} hover:shadow-xl transition-all duration-300 text-left group`}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{config.icon}</span>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${config.badge} font-heading uppercase tracking-wider`}>
          {difficulty}
        </span>
      </div>
      <p className="text-muted-foreground text-sm mb-4">{config.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{config.description}</span>
        <div className="flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-sm font-heading font-semibold text-foreground">{highScore}</span>
        </div>
      </div>
    </motion.button>
  );
}
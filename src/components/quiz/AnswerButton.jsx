import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const labels = ['A', 'B', 'C', 'D'];

export default function AnswerButton({
  answer,
  index,
  onSelect,
  selectedIndex,
  correctIndex,
  disabled,
  showCorrectOnWrong   // NEW
}) {
  const isSelected = selectedIndex === index;
  const isCorrect = correctIndex === index;
  const showResult = selectedIndex !== null;

  // -----------------------------
  // BUTTON BORDER + BACKGROUND
  // -----------------------------
  let stateClass =
    'border-border/50 hover:border-primary/50 hover:bg-secondary/50';

  if (showResult && isCorrect && isSelected) {
    // User selected correct answer
    stateClass = 'border-emerald-500/70 bg-emerald-500/10';
  } 
  else if (showResult && isSelected && !isCorrect) {
    // User selected wrong answer
    stateClass = 'border-rose-500/70 bg-rose-500/10';
  } 
  else if (showResult && isCorrect && !isSelected && showCorrectOnWrong) {
    // Reveal correct answer (blue)
    stateClass = 'border-blue-500/70 bg-blue-500/10';
  }

  // -----------------------------
  // ICON BOX (A/B/C/D or Check/X)
  // -----------------------------
  const iconClass = cn(
    'w-9 h-9 rounded-lg flex items-center justify-center text-sm font-heading font-bold shrink-0 transition-colors',

    // Correct + selected
    showResult && isCorrect && isSelected && 'bg-emerald-500 text-white',

    // Wrong + selected
    showResult && isSelected && !isCorrect && 'bg-rose-500 text-white',

    // Correct revealed (blue)
    showResult &&
      isCorrect &&
      !isSelected &&
      showCorrectOnWrong &&
      'bg-blue-500 text-white',

    // Default state
    (!showResult || !isSelected) &&
      !(showResult && isCorrect && !isSelected && showCorrectOnWrong) &&
      'bg-secondary text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground'
  );

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.08 }}
      whileHover={!disabled ? { scale: 1.01 } : {}}
      whileTap={!disabled ? { scale: 0.99 } : {}}
      onClick={() => !disabled && onSelect(index)}
      disabled={disabled}
      className={cn(
        'w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left group',
        stateClass,
        disabled && !showResult && 'opacity-50 cursor-not-allowed'
      )}
    >
      <div className={iconClass}>
        {showResult && isCorrect && isSelected ? (
          <Check className="w-4 h-4" />
        ) : showResult && isSelected && !isCorrect ? (
          <X className="w-4 h-4" />
        ) : showResult && isCorrect && !isSelected && showCorrectOnWrong ? (
          <Check className="w-4 h-4" />
        ) : (
          labels[index]
        )}
      </div>

      <span className="text-sm font-medium leading-snug">{answer}</span>
    </motion.button>
  );
}
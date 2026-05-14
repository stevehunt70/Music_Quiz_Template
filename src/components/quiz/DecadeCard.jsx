import { motion } from 'framer-motion';

export default function DecadeCard({ decade, label, emoji, onSelect, index }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.07 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(decade)}
      className="w-full flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card hover:border-primary/50 hover:bg-secondary/50 transition-all duration-200 text-left group"
    >
      <span className="text-2xl">{emoji}</span>
      <div className="flex-1">
        <p className="font-heading font-bold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">UK Chart Questions</p>
      </div>
      <div className="text-muted-foreground group-hover:text-primary transition-colors">→</div>
    </motion.button>
  );
}
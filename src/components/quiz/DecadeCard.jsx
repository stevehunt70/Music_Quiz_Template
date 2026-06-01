import { motion } from 'framer-motion';

export default function DecadeCard({ 
  decade, 
  label, 
  emoji, 
  locked = false, 
  onSelect, 
  index 
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.07 }}
      whileHover={!locked ? { scale: 1.02 } : {}}
      whileTap={!locked ? { scale: 0.98 } : {}}
      onClick={() => !locked && onSelect(decade)}
      disabled={locked}
      className={`
        w-full flex items-center gap-4 p-4 rounded-xl border 
        transition-all duration-200 text-left group

        ${locked 
          ? "opacity-40 cursor-not-allowed border-border/30 bg-muted" 
          : "cursor-pointer border-border/50 bg-card hover:border-primary/50 hover:bg-secondary/50"
        }
      `}
    >
      <span className="text-2xl">{emoji}</span>

      <div className="flex-1">
        <p className="font-heading font-bold text-foreground">{label}</p>

        {locked ? (
          <p className="text-xs text-muted-foreground">
            Tap to unlock this decade
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            UK Chart Questions
          </p>
        )}
      </div>

      <div className={`
        transition-colors 
        ${locked ? "text-muted-foreground" : "text-muted-foreground group-hover:text-primary"}
      `}>
        {locked ? "🔒" : "→"}
      </div>
    </motion.button>
  );
}
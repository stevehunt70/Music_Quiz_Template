import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Music } from 'lucide-react';
import DecadeCard from '../components/quiz/DecadeCard';
import logoFull from '../assets/vinyl_logo_invert.png'; 

const decades = [
  { key: '1950s', label: '1950s', emoji: '🎷' },
  { key: '1960s', label: '1960s', emoji: '🌸' },
  { key: '1970s', label: '1970s', emoji: '🕺' },
  { key: '1980s', label: '1980s', emoji: '🎸' },
  { key: '1990s', label: '1990s', emoji: '🎷' },
  { key: '2000s', label: '2000s', emoji: '🎙' },
  { key: '2010s', label: '2010s', emoji: '🎧' },
];

export default function Home() {
  const navigate = useNavigate();

  const handleSelect = (decade) => {
    navigate(`/difficulty?decade=${decade}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"      >
        
        <div align="center">
          <img src={logoFull} className="w-50 h-20 mb-5"></img>
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight mb-3">
          Music Quiz
        </h1>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          Test your knowledge of the UK charts. Choose your decade to begin.
        </p>
      </motion.div>

      <div className="w-full max-w-sm space-y-3">
        {decades.map((d, i) => (
          <DecadeCard
            key={d.key}
            decade={d.key}
            label={d.label}
            emoji={d.emoji}
            onSelect={handleSelect}
            index={i}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex gap-5 mt-3"
      >
        <button
          onClick={() => navigate('/high-scores')}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          High Scores
        </button>
        <button
          onClick={() => navigate('/how-to-play')}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          How to Play
        </button>
        <button
          onClick={() => navigate('/about')}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          About
        </button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-xs text-muted-foreground mt-3"
      >
        No internet required • No ads
      </motion.p>

      
    </div>
  );
}
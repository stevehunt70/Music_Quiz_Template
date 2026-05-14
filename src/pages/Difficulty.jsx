import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import DifficultyCard from '../components/quiz/DifficultyCard';
import { getHighScores } from '../lib/quizStorage';

const difficulties = [
  { key: 'easy', label: 'Easy' },
  { key: 'medium', label: 'Medium' },
  { key: 'hard', label: 'Hard' },
];

export default function Difficulty() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const decade = urlParams.get('decade') || '1980s';
  const highScores = getHighScores(decade);

  const handleSelect = (difficulty) => {
    navigate(`/quiz?decade=${decade}&difficulty=${difficulty}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 w-full max-w-sm"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight mb-2">
          {decade}
        </h1>
        <p className="text-muted-foreground text-sm">
          Choose your difficulty level
        </p>
      </motion.div>

      <div className="w-full max-w-sm space-y-4">
        {difficulties.map((d, i) => (
          <DifficultyCard
            key={d.key}
            difficulty={d.key}
            highScore={highScores[d.key]}
            onSelect={handleSelect}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
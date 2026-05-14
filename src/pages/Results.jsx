import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Target, XCircle, RotateCcw, Home, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getHighScores, setHighScore } from '../lib/quizStorage';

export default function Results() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const decade = urlParams.get('decade') || '1980s';
  const difficulty = urlParams.get('difficulty') || 'easy';
  const score = parseInt(urlParams.get('score') || '0', 10);
  const totalAnswered = parseInt(urlParams.get('total') || '0', 10);
  const totalQuestions = parseInt(urlParams.get('questions') || '0', 10);
  const wrong = totalAnswered - score;

  const scoreKey = `${decade}_${difficulty}`;
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [prevHighScore, setPrevHighScore] = useState(0);

  useEffect(() => {
    const scores = getHighScores();
    setPrevHighScore(scores[scoreKey] || 0);
    const isNew = setHighScore(scoreKey, score);
    setIsNewHighScore(isNew);
  }, [scoreKey, score]);

  const percentage = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;
  const stoppedEarly = totalAnswered < totalQuestions;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm text-center"
      >
        {isNewHighScore && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-sm font-heading font-semibold mb-6"
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            New High Score!
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-5xl sm:text-6xl font-heading font-black mb-2">
            {score}
            <span className="text-2xl text-muted-foreground font-normal">/{totalAnswered}</span>
          </h1>
          <p className="text-muted-foreground text-sm mb-2">{percentage}% correct</p>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-heading mb-8">
            {decade} • {difficulty}
            {stoppedEarly && ' • stopped early'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-3 mb-8"
        >
          <div className="p-4 rounded-xl bg-card border border-border/50">
            <Target className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
            <p className="text-xl font-heading font-bold">{score}</p>
            <p className="text-xs text-muted-foreground">Correct</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border/50">
            <XCircle className="w-5 h-5 text-rose-400 mx-auto mb-2" />
            <p className="text-xl font-heading font-bold">{wrong}</p>
            <p className="text-xs text-muted-foreground">Wrong</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border/50">
            <Trophy className="w-5 h-5 text-amber-400 mx-auto mb-2" />
            <p className="text-xl font-heading font-bold">
              {isNewHighScore ? score : prevHighScore}
            </p>
            <p className="text-xs text-muted-foreground">Best</p>
          </div>
        </motion.div>

        {!isNewHighScore && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-muted-foreground mb-6"
          >
            High score to beat: <span className="font-semibold text-foreground">{prevHighScore}</span>
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-3"
        >
          <Button
            onClick={() => navigate(`/quiz?decade=${decade}&difficulty=${difficulty}`)}
            className="w-full h-12 text-sm font-heading font-semibold gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(`/difficulty?decade=${decade}`)}
            className="w-full h-12 text-sm font-heading font-semibold gap-2"
          >
            Change Difficulty
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="w-full h-12 text-sm font-heading font-semibold gap-2"
          >
            <Home className="w-4 h-4" />
            Choose Decade
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
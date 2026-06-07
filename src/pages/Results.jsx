// src/pages/Results.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getHighScore, setHighScore } from "@/lib/quizStorage";
import { XCircle, Target, Trophy } from "lucide-react";
import { motion } from 'framer-motion';
import logoFull from '../assets/vinyl_logo_invert.png'; 

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, decade, difficulty, questionCount } = location.state || {};

  const [prevHighScore, setPrevHighScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  const isUnlimited = questionCount === "unlimited";

  useEffect(() => {
    if (!decade || !difficulty || !questionCount) return;

    const key = isUnlimited ? "unlimited" : questionCount;

    const previous = getHighScore(decade, difficulty, key);
    setPrevHighScore(previous);

    const isNew = setHighScore(decade, difficulty, key, score);
    setIsNewHighScore(isNew);
  }, [decade, difficulty, questionCount, score]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-5 py-10 space-y-8">
      <div className="flex justify-center">
        <div className="flex items-center gap-4">
          <img src={logoFull} className="h-20 w-auto" />
          <h1 className="text-3xl font-heading font-bold leading-none">Results</h1>
        </div>
      </div>
      

      <div className="space-y-3 text-lg">
        <p className="text-muted-foreground">
          <strong>
            {isUnlimited ? "Unlimited mode" : `${questionCount} questions selected`}
          </strong>
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center gap-4 mb-8">
          <div className="w-[110px] p-4 rounded-xl bg-card border border-border/50 text-center">
            <Target className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
            <p className="text-xl font-heading font-bold">{score}</p>
            <p className="text-xs text-muted-foreground">Correct</p>
          </div>

          <div className="w-[110px] p-4 rounded-xl bg-card border border-border/50 text-center">
            <XCircle className="w-5 h-5 text-rose-400 mx-auto mb-2" />
            <p className="text-xl font-heading font-bold">
              {isUnlimited ? "—" : questionCount - score}
            </p>
            <p className="text-xs text-muted-foreground">Wrong</p>
          </div>

          <div className="w-[110px] p-4 rounded-xl bg-card border border-border/50 text-center">
            <Trophy className="w-5 h-5 text-amber-400 mx-auto mb-2" />
            <p className="text-xl font-heading font-bold">
              {isNewHighScore ? score : prevHighScore}
            </p>
            <p className="text-xs text-muted-foreground">Best</p>
          </div>
      </motion.div>

      {isNewHighScore ? (
        <p className="text-green-600 font-bold">🎉 New High Score!</p>
      ) : (
        <p className="text-muted-foreground">
          {isUnlimited
            ? `High Score: ${prevHighScore} questions`
            : `High Score: ${prevHighScore} / ${questionCount}`}
        </p>
      )}


      <div className="w-full max-w-[360px] flex flex-col gap-3 items-center">
        <button
          onClick={() => navigate("/")}
          className="w-full max-w-[360px] py-3 rounded-xl bg-primary text-primary-foreground"
        >
          Back to Home
        </button>

        <button
          onClick={() => navigate("/highscores")}
          className="w-full max-w-[360px] py-3 rounded-xl border hover:bg-accent"
        >
          View High Scores
        </button>
      </div>

    </div>
  );
}
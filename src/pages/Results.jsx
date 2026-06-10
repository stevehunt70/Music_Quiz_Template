// src/pages/Results.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getHighScore, setHighScore } from "@/lib/quizStorage";
import { XCircle, Target, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import confetti from "canvas-confetti";   // ⭐ REAL FIREWORKS ENGINE
import logoFull from "../assets/vinyl_logo_invert.png";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, decade, difficulty, questionCount } = location.state || {};

  const [prevHighScore, setPrevHighScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  const [showConfetti, setShowConfetti] = useState(false);
  const [fireworksPending, setFireworksPending] = useState(false);

  const isUnlimited = questionCount === "unlimited";

  // 🎆 REAL FIREWORKS FUNCTION (canvas-confetti)
  function shootFireworks() {
    const origin = { x: Math.random(), y: 1 };

    // Launch streak
    confetti({
      particleCount: 1,
      startVelocity: 80,
      spread: 5,
      ticks: 50,
      gravity: -0.5,
      origin,
      colors: ["#ffffff"],
    });

    setTimeout(() => {
      // Explosion
      for (let i = 0; i < 20; i++) {
        confetti({
          particleCount: 10,
          angle: i * 18,
          spread: 45,
          startVelocity: 50,
          origin: { x: origin.x, y: 0.3 },
          ticks: 200,
          gravity: 0.8,
          scalar: 1.2,
        });
      }
    }, 500);
  }

  // Load high scores + trigger celebrations
  useEffect(() => {
    if (!decade || !difficulty || !questionCount) return;

    const key = isUnlimited ? "unlimited" : questionCount;

    const previous = getHighScore(decade, difficulty, key);
    setPrevHighScore(previous);

    const isNew = setHighScore(decade, difficulty, key, score);
    setIsNewHighScore(isNew);

    // 🎆 Perfect score → queue fireworks
    if (!isUnlimited && score === Number(questionCount)) {
      setFireworksPending(true);
    }

    // 🎉 New high score → confetti
    if (isNew) {
      setShowConfetti(true);
    }
  }, [decade, difficulty, questionCount, score]);

  // Fire fireworks AFTER render
  useEffect(() => {
    if (fireworksPending) {
      shootFireworks();
    }
  }, [fireworksPending]);

  return (
    <>
      {/* CONFETTI */}
      {showConfetti && <Confetti />}

      {/* FIREWORKS CANVAS (required for canvas-confetti) */}
      <canvas
        id="fireworks-canvas"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 999999,
        }}
      ></canvas>

      {/* MAIN RESULTS UI */}
      <div className="min-h-screen flex flex-col items-center justify-start px-5 py-10 space-y-8">
        <div className="flex justify-center">
          <div className="flex items-center gap-4">
            <img src={logoFull} className="h-20 w-auto" />
            <h1 className="text-3xl font-heading font-bold leading-none">
              Results
            </h1>
          </div>
        </div>

        <div className="space-y-3 text-lg">
          <p className="text-muted-foreground">
            <strong>
              {isUnlimited
                ? "Unlimited mode"
                : `${questionCount} questions selected`}
            </strong>
          </p>
        </div>

        {/* SCORE BOXES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4 mb-8"
        >
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

        {/* HIGH SCORE TEXT */}
        {isNewHighScore ? (
          <p className="text-green-600 font-bold">🎉 New High Score!</p>
        ) : (
          <p className="text-muted-foreground">
            {isUnlimited
              ? `High Score: ${prevHighScore} questions`
              : `High Score: ${prevHighScore} / ${questionCount}`}
          </p>
        )}

        {/* BUTTONS */}
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
    </>
  );
}

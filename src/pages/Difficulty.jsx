// src/pages/Difficulty.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Difficulty() {
  const navigate = useNavigate();
  const location = useLocation();

  const { decade, showCorrectOnWrong } = location.state || {};

  const [difficulty, setDifficulty] = useState(1);
  const [questionCount, setQuestionCount] = useState(10);

  const questionCounts = [5, 10, 15, 20, 25, 30, "unlimited"];

  function startQuiz() {
    navigate("/quiz", {
      state: {
        decade,
        difficulty,
        questionCount,
        showCorrectOnWrong   // NEW: pass setting forward
      }
    });
  }

  return (
    <div className="min-h-screen px-5 py-10 max-w-xl mx-auto space-y-8">

      <h1 className="text-3xl font-heading font-bold text-center">
        Select Difficulty
      </h1>

      {/* DIFFICULTY BUTTONS */}
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4, 5].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setDifficulty(lvl)}
            className={`w-full p-4 rounded-xl border text-left transition
              ${difficulty === lvl ? "bg-primary text-primary-foreground" : "bg-card"}
            `}
          >
            Level {lvl}
          </button>
        ))}
      </div>

      {/* QUESTION COUNT DROPDOWN */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Number of Questions</label>
        <select
          value={questionCount}
          onChange={(e) => setQuestionCount(e.target.value)}
          className="w-full p-3 rounded-xl border bg-card"
        >
          {questionCounts.map((qc) => (
            <option key={qc} value={qc}>
              {qc === "unlimited" ? "Unlimited" : `${qc} Questions`}
            </option>
          ))}
        </select>
      </div>

      {/* START BUTTON */}
      <button
        onClick={startQuiz}
        className="w-full p-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition"
      >
        Start Quiz
      </button>

    </div>
  );
}
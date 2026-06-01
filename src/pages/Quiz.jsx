// src/pages/Quiz.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizHeader from "@/components/quiz/QuizHeader";
import AnswerButton from "@/components/quiz/AnswerButton";
import { generateQuestion, buildMultipleChoice } from "@/lib/questionGenerator";
import { shuffleArray } from "@/lib/shuffleArray";

export default function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();

  const { decade, difficulty, questionCount, showCorrectOnWrong } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const data = await import(`../data/songs${decade}.json`);
        const dataset = data.default;

        const filtered = dataset.filter(
          (e) => e.difficulty_level <= Number(difficulty)
        );

        const selected = shuffleArray(filtered).slice(0, questionCount);

        const generatedQuestions = selected
          .map((entry) => {
            const q = generateQuestion(entry);
            return buildMultipleChoice(entry, dataset, q);
          })
          .filter(Boolean);

        setQuestions(generatedQuestions);
      } catch (err) {
        console.error("Quiz generation error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [decade, difficulty, questionCount]);

  if (loading || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading…
      </div>
    );
  }

  const currentQ = questions[current];

  function handleSelect(index) {
  if (selectedIndex !== null) return;

  setSelectedIndex(index);

  const isCorrect = index === currentQ.correctIndex;
  if (isCorrect) {
    setScore((prev) => prev + 1);
  }

  setTimeout(() => {
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
      setSelectedIndex(null);
    } else {
      const finalScore = isCorrect ? score + 1 : score;

      navigate("/results", {
        state: {
          score: finalScore,
          total: questions.length,
          decade,
          difficulty,
          questionCount
        }
      });
    }
  }, 900);
}

  function handleStop() {
  // If the user has selected an answer on this question,
  // and React hasn't updated score yet, fix it.
  const isCorrect = selectedIndex === currentQ.correctIndex;
  const finalScore = isCorrect ? score + 1 : score;

  navigate("/results", {
    state: {
      score: finalScore,
      total: questions.length,
      decade,
      difficulty,
      questionCount
    }
  });
}

  return (
    <div className="min-h-screen px-5 py-8 max-w-xl mx-auto space-y-8">
      <QuizHeader
        questionNumber={current + 1}
        totalQuestions={questions.length}
        score={score}
        difficulty={`Level ${difficulty}`}
        onStop={handleStop}
      />

      <div className="text-center space-y-4">
        <h2 className="text-xl font-heading font-bold leading-snug">
          {currentQ.question}
        </h2>
      </div>

      <div className="space-y-3 mt-6">
        {currentQ.answers.map((answer, i) => (
          <AnswerButton
            key={i}
            answer={answer}
            index={i}
            onSelect={handleSelect}
            selectedIndex={selectedIndex}
            correctIndex={currentQ.correctIndex}
            disabled={selectedIndex !== null}
            showCorrectOnWrong={showCorrectOnWrong}
          />
        ))}
      </div>
    </div>
  );
}
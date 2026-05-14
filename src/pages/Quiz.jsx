import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import QuizHeader from '../components/quiz/QuizHeader';
import AnswerButton from '../components/quiz/AnswerButton';
import { shuffleArray } from '../lib/quizStorage';

import q1950s from '../data/questions1950s.json';
import q1960s from '../data/questions1960s.json';
import q1970s from '../data/questions1970s.json';

const allQuestions = {
  '1950s': q1950s,
  '1960s': q1960s,
  '1970s': q1970s,
};

export default function Quiz() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const decade = urlParams.get('decade') || '1980s';
  const difficulty = urlParams.get('difficulty') || 'easy';

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    const decadeSet = allQuestions[decade];
    if (!decadeSet) {
      navigate('/');
      return;
    }
    // Filter by difficulty
    const filtered = decadeSet.filter(
      q => q.difficulty?.toLowerCase() === difficulty.toLowerCase()
    );
    if (filtered.length === 0) {
      navigate(`/difficulty?decade=${decade}`);
      return;
    }
    // Shuffle questions AND shuffle each question's answers
    const shuffled = shuffleArray(filtered).map(q => {
      const indexed = q.answers.map((a, i) => ({ text: a, isCorrect: i === q.correct }));
      const shuffledAnswers = shuffleArray(indexed);
      return {
        ...q,
        answers: shuffledAnswers.map(a => a.text),
        correct: shuffledAnswers.findIndex(a => a.isCorrect),
      };
    });
    setQuestions(shuffled);
  }, [decade, difficulty, navigate]);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const finishQuiz = useCallback((finalScore, finalIndex) => {
    navigate(`/results?decade=${decade}&difficulty=${difficulty}&score=${finalScore}&total=${finalIndex}&questions=${totalQuestions}`);
  }, [navigate, decade, difficulty, totalQuestions]);

  const handleAnswer = (answerIndex) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);

    const isCorrect = answerIndex === currentQuestion.correct;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    setTimeout(() => {
      if (currentIndex + 1 >= totalQuestions) {
        finishQuiz(newScore, currentIndex + 1);
      } else {
        setCurrentIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      }
    }, 1200);
  };

  const handleStop = () => {
    finishQuiz(score, currentIndex);
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-5 py-6 max-w-lg mx-auto">
      <QuizHeader
        questionNumber={currentIndex + 1}
        totalQuestions={totalQuestions}
        score={score}
        difficulty={`${decade} • ${difficulty}`}
        onStop={handleStop}
      />

      <div className="flex-1 flex flex-col justify-center py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-heading font-bold leading-snug">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-3">
              {currentQuestion.answers.map((answer, i) => (
                <AnswerButton
                  key={`${currentIndex}-${i}`}
                  answer={answer}
                  index={i}
                  onSelect={handleAnswer}
                  selectedIndex={selectedAnswer}
                  correctIndex={currentQuestion.correct}
                  disabled={selectedAnswer !== null}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
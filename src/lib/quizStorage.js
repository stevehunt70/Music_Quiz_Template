// src/lib/quizStorage.js

function loadScores() {
  return JSON.parse(localStorage.getItem("highscores") || "{}");
}

function saveScores(scores) {
  localStorage.setItem("highscores", JSON.stringify(scores));
}

export function getHighScore(decade, difficulty, questionCount) {
  const key = `${decade}_${difficulty}_${questionCount}`;
  const scores = loadScores();
  return scores[key] || 0;
}

export function setHighScore(decade, difficulty, questionCount, score) {
  const key = `${decade}_${difficulty}_${questionCount}`;
  const scores = loadScores();
  const previous = scores[key] || 0;

  const isNew = score > previous;
  if (isNew) {
    scores[key] = score;
    saveScores(scores);
  }

  return isNew;
}
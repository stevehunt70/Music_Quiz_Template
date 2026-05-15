const STORAGE_KEY = 'music_quiz_high_scores';

export function getHighScores(decade) {
  const stored = localStorage.getItem(STORAGE_KEY);
  const allScores = stored ? JSON.parse(stored) : {};
  if (decade) {
    return {
      easy: allScores[`${decade}_easy`] || 0,
      medium: allScores[`${decade}_medium`] || 0,
      hard: allScores[`${decade}_hard`] || 0,
    };
  }
  return allScores;
}

export function setHighScore(key, score) {
  const stored = localStorage.getItem(STORAGE_KEY);
  const allScores = stored ? JSON.parse(stored) : {};
  if (score > (allScores[key] || 0)) {
    allScores[key] = score;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allScores));
    return true;
  }
  return false;
}

export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
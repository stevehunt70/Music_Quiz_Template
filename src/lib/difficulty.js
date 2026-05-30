export function getDifficultyLevel(peak) {
  if (peak <= 10) return 1;
  if (peak <= 20) return 2;
  if (peak <= 30) return 3;
  if (peak <= 50) return 4;
  return 5;
}
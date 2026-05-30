import { shuffleArray } from "./shuffleArray";

export function generateQuestion(entry) {
  const questionTypes = [
    "artist_from_song",
    "year_from_song",
    "peak_from_song",
    "weeks_from_song"
  ];

  const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];

  switch (type) {
    case "artist_from_song":
      return {
        question: `Who recorded "${entry.song_title}"?`,
        correct: entry.artist,
        wrongField: "artist"
      };

    case "year_from_song":
      return {
        question: `In what year did ${entry.artist} chart with "${entry.song_title}"?`,
        correct: entry.year.toString(),
        wrongField: "year"
      };

    case "peak_from_song":
      return {
        question: `What was the peak chart position of "${entry.song_title}" by ${entry.artist}?`,
        correct: entry.peak_position.toString(),
        wrongField: "peak_position"
      };

    case "weeks_from_song":
      return {
        question: `How many weeks did "${entry.song_title}" by ${entry.artist} stay on the charts?`,
        correct: entry.weeks_on_chart.toString(),
        wrongField: "weeks_on_chart"
      };

    default:
      return null;
  }
}

export function buildMultipleChoice(entry, dataset, question) {
  if (!question) return null;

  // Difficulty → max peak allowed
  const difficultyMax = {
    1: 10,
    2: 20,
    3: 30,
    4: 40,
    5: 50
  };

  const maxPeak = difficultyMax[entry.difficulty_level] || 10;

  // ----------------------------------------------------
  // SPECIAL CASE 1: PEAK POSITION QUESTIONS
  // ----------------------------------------------------
  if (question.wrongField === "peak_position") {
    const correct = Number(question.correct);
    const used = new Set([correct]);
    const wrong = [];

    while (wrong.length < 3) {
      const num = Math.floor(Math.random() * maxPeak) + 1;
      if (!used.has(num)) {
        used.add(num);
        wrong.push(num.toString());
      }
    }

    const answers = shuffleArray([question.correct, ...wrong]);

    return {
      question: question.question,
      answers,
      correctIndex: answers.indexOf(question.correct)
    };
  }

  // ----------------------------------------------------
  // SPECIAL CASE 2: WEEKS ON CHART QUESTIONS
  // ----------------------------------------------------
  if (question.wrongField === "weeks_on_chart") {
    const correct = Number(question.correct);
    const maxWeeks = 20;

    const used = new Set([correct]);
    const wrong = [];

    while (wrong.length < 3) {
      const num = Math.floor(Math.random() * maxWeeks) + 1;
      if (!used.has(num)) {
        used.add(num);
        wrong.push(num.toString());
      }
    }

    const answers = shuffleArray([question.correct, ...wrong]);

    return {
      question: question.question,
      answers,
      correctIndex: answers.indexOf(question.correct)
    };
  }

  // ----------------------------------------------------
  // SPECIAL CASE 3: YEAR QUESTIONS (NEW)
  // ----------------------------------------------------
  if (question.wrongField === "year") {
    const correct = Number(question.correct);

    // Determine decade range
    const decadeStart = Math.floor(correct / 10) * 10;
    const decadeEnd = decadeStart + 9;

    const used = new Set([correct]);
    const wrong = [];

    while (wrong.length < 3) {
      const year = Math.floor(Math.random() * 10) + decadeStart;
      if (!used.has(year)) {
        used.add(year);
        wrong.push(year.toString());
      }
    }

    const answers = shuffleArray([question.correct, ...wrong]);

    return {
      question: question.question,
      answers,
      correctIndex: answers.indexOf(question.correct)
    };
  }

  // ----------------------------------------------------
  // DEFAULT CASE: ARTIST QUESTIONS
  // ----------------------------------------------------
  let wrongPool = dataset
    .filter(e => e.id !== entry.id)
    .map(e => e[question.wrongField])
    .filter(v => v !== undefined && v !== null && v !== "")
    .map(v => v.toString());

  let unique = [...new Set(wrongPool)];

  function fallback() {
    return "Unknown Artist " + Math.floor(Math.random() * 100);
  }

  while (unique.length < 3) {
    unique.push(fallback());
    unique = [...new Set(unique)];
  }

  const wrongAnswers = shuffleArray(unique).slice(0, 3);

  const answers = shuffleArray([
    question.correct,
    ...wrongAnswers
  ]);

  return {
    question: question.question,
    answers,
    correctIndex: answers.indexOf(question.correct)
  };
}
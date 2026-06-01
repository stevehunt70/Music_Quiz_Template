import { shuffleArray } from "./shuffleArray";

// ------------------------------------------------------
// WEIGHTED QUESTION TYPE SELECTION
// ------------------------------------------------------
const weightedTypes = [
  { type: "artist_from_song", weight: 50 },
  { type: "song_from_artist", weight: 25 },
  { type: "song_from_year", weight: 10 },
  { type: "peak_from_song", weight: 10 },
  { type: "year_from_song", weight: 4 },
  { type: "weeks_from_song", weight: 1 }
];

function pickWeightedType() {
  const total = weightedTypes.reduce((sum, t) => sum + t.weight, 0);
  let r = Math.random() * total;

  for (const t of weightedTypes) {
    if (r < t.weight) return t.type;
    r -= t.weight;
  }

  return "artist_from_song"; // fallback
}

// ------------------------------------------------------
// QUESTION GENERATOR
// ------------------------------------------------------
export function generateQuestion(entry, dataset) {
  const type = pickWeightedType();

  switch (type) {
    // --------------------------------------------------
    // 1. Who recorded SONG?
    // --------------------------------------------------
    case "artist_from_song":
      return {
        question: `Who recorded "${entry.song_title}"?`,
        correct: entry.artist,
        wrongField: "artist"
      };

    // --------------------------------------------------
    // 2. Which song was recorded by ARTIST?
    // --------------------------------------------------
    case "song_from_artist": {
      return {
        question: `Which of these songs was recorded by ${entry.artist}?`,
        correct: entry.song_title,
        wrongField: "song_title"
      };
    }

    // --------------------------------------------------
    // 3. Which song charted in YEAR?
    // --------------------------------------------------
    case "song_from_year": {
      return {
        question: `Which of these songs by ${entry.artist}, charted in ${entry.year}?`,
        correct: entry.song_title,
        wrongField: "song_title_same_year",
        filterValue: entry.year
      };
    }

    // --------------------------------------------------
    // 4. Peak position
    // --------------------------------------------------
    case "peak_from_song":
      return {
        question: `What was the peak chart position of "${entry.song_title}" by ${entry.artist}?`,
        correct: entry.peak_position.toString(),
        wrongField: "peak_position"
      };

    // --------------------------------------------------
    // 5. Year question
    // --------------------------------------------------
    case "year_from_song":
      return {
        question: `In what year did ${entry.artist} chart with "${entry.song_title}"?`,
        correct: entry.year.toString(),
        wrongField: "year"
      };

    // --------------------------------------------------
    // 6. Weeks on chart
    // --------------------------------------------------
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

// ------------------------------------------------------
// MULTIPLE CHOICE BUILDER (your existing logic + fixes)
// ------------------------------------------------------
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
  // SPECIAL CASE: PEAK POSITION
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
  // SPECIAL CASE: WEEKS ON CHART
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
  // SPECIAL CASE: YEAR (decade locked)
  // ----------------------------------------------------
  if (question.wrongField === "year") {
    const correct = Number(question.correct);
    const decadeStart = Math.floor(correct / 10) * 10;
    const used = new Set([correct]);
    const wrong = [];

    while (wrong.length < 3) {
      const year = decadeStart + Math.floor(Math.random() * 10);
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
  // SPECIAL CASE: SONGS FROM SAME YEAR
  // ----------------------------------------------------
if (question.wrongField === "song_title_same_year") {
  const correct = question.correct;
  const year = question.filterValue;

  // Determine decade range
  const decadeStart = Math.floor(year / 10) * 10;
  const decadeEnd = decadeStart + 9;

  // WRONG answers = songs from same decade but NOT same year
  const pool = dataset
    .filter(e =>
      e.year >= decadeStart &&
      e.year <= decadeEnd &&
      e.year !== year &&
      e.song_title !== correct
    )
    .map(e => e.song_title);

  let unique = [...new Set(pool)];

  // Fallback if decade is sparse (rare)
  while (unique.length < 3) {
    unique.push("Unknown Song " + Math.floor(Math.random() * 100));
    unique = [...new Set(unique)];
  }

  const wrong = shuffleArray(unique).slice(0, 3);
  const answers = shuffleArray([correct, ...wrong]);

  return {
    question: question.question,
    answers,
    correctIndex: answers.indexOf(correct)
  };
}

  // ----------------------------------------------------
  // DEFAULT CASE: ARTIST / SONG TITLE
  // ----------------------------------------------------
  let wrongPool = dataset
    .filter(e => e.id !== entry.id)
    .map(e => e[question.wrongField])
    .filter(v => v)
    .map(v => v.toString());

  let unique = [...new Set(wrongPool)];

  while (unique.length < 3) {
    unique.push("Unknown " + Math.floor(Math.random() * 100));
    unique = [...new Set(unique)];
  }

  const wrongAnswers = shuffleArray(unique).slice(0, 3);
  const answers = shuffleArray([question.correct, ...wrongAnswers]);

  return {
    question: question.question,
    answers,
    correctIndex: answers.indexOf(question.correct)
  };
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, TrendingUp, Music, Disc3, Flame, Trophy } from "lucide-react";
import { getHighScore } from "@/lib/quizStorage";
import logoFull from '../assets/vinyl_logo_invert.png'; 

const decades = ["1950s","1960s","1970s","1980s","1990s","2000s","2010s"];
const questionCounts = [5,10,15,20,25,30];
const difficulties = [1,2,3,4,5];

const difficultyConfig = {
  1: {
    title: "Level 1",
    description: "Hits in the Top 10",
    color: "text-emerald-400",
    icon: Star,
  },
  2: {
    title: "Level 2",
    description: "Hits in the Top 20",
    color: "text-amber-400",
    icon: TrendingUp,
  },
  3: {
    title: "Level 3",
    description: "Hits in the Top 30",
    color: "text-blue-400",
    icon: Music,
  },
  4: {
    title: "Level 4",
    description: "Hits in the Top 40",
    color: "text-purple-400",
    icon: Disc3,
  },
  5: {
    title: "Level 5",
    description: "Hits in the Top 50",
    color: "text-rose-400",
    icon: Flame,
  },
};

export default function HighScores() {
  const [decade, setDecade] = useState("1980s");
  const [questionCount, setQuestionCount] = useState(10);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-5 py-10 max-w-xl mx-auto space-y-8">
      <div className="flex justify-center">
        <div className="flex items-center gap-4">
            <img src={logoFull} className="h-20 w-auto" />
            <h1 className="text-3xl font-heading font-bold leading-none">High Scores</h1>
        </div>
      </div>
      {/* DROPDOWNS */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
        {/* Decade */}
        <div>
          <label className="text-xs text-muted-foreground">Decade</label>
          <select
            value={decade}
            onChange={(e) => setDecade(e.target.value)}
            className="w-full p-3 rounded-xl border bg-card"
          >
            {decades.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        {/* Question Count */}
        <div>
          <label className="text-xs text-muted-foreground">Questions</label>
          <select
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="w-full p-3 rounded-xl border bg-card"
          >
            {questionCounts.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      {/* HIGH SCORE CARD */}
      <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-border/40">
          <p className="font-heading font-bold text-foreground text-lg">
            {decade} — {questionCount} Questions
          </p>
        </div>
        {/* Difficulty rows */}
        <div className="divide-y divide-border/30">
          {difficulties.map((diff) => {
          const score = getHighScore(decade, diff, questionCount);
          const cfg = difficultyConfig[diff];
          const Icon = cfg.icon;

          return (
            <div
              key={diff}
              className="flex items-center justify-between px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${cfg.color}`} />

                <div className="flex flex-col">
                  <span className={`text-sm font-heading font-semibold ${cfg.color}`}>
                    {cfg.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {cfg.description}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Trophy className={`w-4 h-4 ${cfg.color}`} />
                <span className="text-sm font-heading font-bold text-foreground">
                  {score}
                </span>
              </div>
            </div>
          );
        })}
        </div>
      </div>
      <div className="flex flex-col w-full mx-auto">
        <button
          onClick={() => navigate("/")}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground"
        >
          Take Me Back Home
        </button>
      </div>
    </div>
    
  );
}
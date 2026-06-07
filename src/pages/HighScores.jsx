import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, TrendingUp, Music, Disc3, Flame } from "lucide-react";
import { getHighScore } from "@/lib/quizStorage";
import { getDropdownDecades } from "@/lib/purchases";
import logoFull from "../assets/vinyl_logo_invert.png";

const questionCounts = [5, 10, 15, 20, 25, 30, "Unlimited"];
const difficulties = [1, 2, 3, 4, 5];

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

function formatDecadeLabel(decade) {
  if (decade === "free") return "Free Pack";
  if (decade === "all") return "All Decades";
  return decade;
}

export default function HighScores() {
  const navigate = useNavigate();

  // Only Free + Purchased + All (if unlocked)
  const decades = getDropdownDecades();

  // Default to first available decade
  const [decade, setDecade] = useState(decades[0]);

  return (
    <div className="min-h-screen px-5 py-10 max-w-xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="flex justify-center">
        <div className="flex items-center gap-4">
          <img src={logoFull} className="h-20 w-auto" />
          <h1 className="text-3xl font-heading font-bold leading-none">
            High Scores
          </h1>
        </div>
      </div>

      {/* DROPDOWN */}
      <div className="w-full max-w-md mx-auto">
        <label className="text-xs text-muted-foreground">Decade</label>
        <select
          value={decade}
          onChange={(e) => setDecade(e.target.value)}
          className="w-full p-3 rounded-xl border bg-card"
        >
          {decades.map((d) => (
            <option key={d} value={d}>
              {formatDecadeLabel(d)}
            </option>
          ))}
        </select>
      </div>

      {/* HIGH SCORE CARD */}
      <div className="rounded-xl border border-border/50 bg-card overflow-hidden">

        {/* Header */}
        <div className="px-4 py-3 border-b border-border/40">
          <p className="font-heading font-bold text-foreground text-lg">
            {formatDecadeLabel(decade)} — All Question Counts
          </p>
        </div>

        {/* Difficulty Rows */}
        <div className="divide-y divide-border/30">
          {difficulties.map((diff) => {
            const cfg = difficultyConfig[diff];
            const Icon = cfg.icon;

            return (
              <div key={diff} className="px-4 py-4 space-y-3">

                {/* Difficulty Header */}
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${cfg.color}`} />

                  <div className="flex flex-col">
                    <span
                      className={`text-sm font-heading font-semibold ${cfg.color}`}
                    >
                      {cfg.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {cfg.description}
                    </span>
                  </div>
                </div>

                {/* Mini Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-muted-foreground text-xs">
                        {questionCounts.map((qc) => {
                          const key = qc === "unlimited" ? "unlimited" : qc;
                          const score = getHighScore(decade, diff, key) || 0;

                          return (
                            <td key={qc} className="px-2 py-1 text-center font-heading font-bold">
                              {qc === "Unlimited" ? "∞" : `Q${qc}`}
                            </td>
                          );
                        })}

                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {questionCounts.map((qc) => {
                          const score =
                            getHighScore(decade, diff, qc) || 0;

                          return (
                            <td
                              key={qc}
                              className="px-2 py-1 text-center font-heading font-bold"
                            >
                              {score}
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* BACK BUTTON */}
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
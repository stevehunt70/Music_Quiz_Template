import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import DecadeCard from "@/components/quiz/DecadeCard";
import { userHasPack, userHasAllDecades } from "@/lib/purchases";
import logoFull from "../assets/vinyl_logo_invert.png";

export default function Home() {
  const navigate = useNavigate();

  function handleRestorePurchases() {
    try {
      const restored = JSON.parse(localStorage.getItem("entitlements"));

      if (!restored) {
        alert("No previous purchases found.");
        return;
      }

      localStorage.setItem("entitlements", JSON.stringify(restored));

      alert("Purchases restored successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Restore failed:", err);
      alert("Unable to restore purchases.");
    }
  }

  // NEW: Setting state
  const [showCorrectOnWrong, setShowCorrectOnWrong] = useState(true);

  // Load saved setting
  useEffect(() => {
    const saved = localStorage.getItem("showCorrectOnWrong");
    if (saved !== null) setShowCorrectOnWrong(saved === "true");
  }, []);

  // Toggle handler
  function toggleSetting() {
    const newValue = !showCorrectOnWrong;
    setShowCorrectOnWrong(newValue);
    localStorage.setItem("showCorrectOnWrong", newValue);
  };

  const handleSelect = (decade) => {
  navigate("/difficulty", {
    state: { decade,
            showCorrectOnWrong   // NEW: pass setting forward
    },  
  });
  };

  const decades = [
    "1950s",
    "1960s",
    "1970s",
    "1980s",
    "1990s",
    "2000s",
    "2010s"
  ];

  const decadeMeta = {
    free: {
      emoji: "🎁",
      description: "A mix of hits across all decades"
    },
    "1950s": {
      emoji: "🎙️",
      description: "Rock ’n’ roll, doo‑wop, and early pop classics"
    },
    "1960s": {
      emoji: "🎸",
      description: "British Invasion, Motown, and psychedelic rock"
    },
    "1970s": {
      emoji: "🕺",
      description: "Disco, funk, soft rock, and early punk"
    },
    "1980s": {
      emoji: "🎹",
      description: "Synth‑pop, new wave, and power ballads"
    },
    "1990s": {
      emoji: "🎧",
      description: "Grunge, Britpop, R&B, and dance anthems"
    },
    "2000s": {
      emoji: "📀",
      description: "Pop‑punk, R&B, hip‑hop, and club hits"
    },
    "2010s": {
      emoji: "🎤",
      description: "EDM, trap, indie pop, and global chart‑toppers"
    },
    all: {
      emoji: "🌍",
      description: "Every decade combined into one mega‑quiz"
    }
  };

  return (
    <div className="grid gap-4 px-5 py-8 max-w-xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-center">
        <div className="flex items-center gap-4">
          <img src={logoFull} className="h-20 w-auto" />
          <h1 className="text-2xl font-heading font-bold leading-none">
            UK Chart Music Quiz
          </h1>          
        </div>        
      </div>
      <div>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          Test your knowledge of the UK charts. Choose your decade to begin.
        </p>
      </div>
      {/* NEW: Toggle Switch */}
        <div className="flex items-center justify-center gap-3">
          <span className="text-xs text-muted-foreground">
            Show Correct Answer When Wrong
          </span>

          <button
            onClick={toggleSetting}
            className={`w-12 h-6 rounded-full transition relative ${
              showCorrectOnWrong ? "bg-primary" : "bg-muted"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${
                showCorrectOnWrong ? "left-6" : "left-0.5"
              }`}
            />
          </button>
        </div>

      {/* FREE PACK */}
      <DecadeCard
        decade="free"
        label="Free Pack"
        emoji={decadeMeta.free.emoji}
        description={decadeMeta.free.description}
        locked={false}
        onSelect={() =>
          navigate("/difficulty", { state: { decade: "free", showCorrectOnWrong } })
        }
      />

      {/* DECADE PACKS */}
      {decades.map((d) => (
        <DecadeCard
          key={d}
          decade={d}
          label={d}
          emoji={decadeMeta[d].emoji}
          description={decadeMeta[d].description}
          locked={!userHasPack(d)}
          onSelect={() => {
            if (!userHasPack(d)) return alert(`Purchase ${d} pack`);
            navigate("/difficulty", { state: { decade: d, showCorrectOnWrong } });
          }}
        />
      ))}


      {/* ALL DECADES */}
      <DecadeCard
        decade="all"
        label="All Decades"
        emoji="🌍"
        locked={!userHasAllDecades()}
        onSelect={() => {
          if (!userHasAllDecades()) return alert("Purchase more packs");
          navigate("/difficulty", { state: { decade: "all", showCorrectOnWrong } });
        }}
      />

      <button
        onClick={handleRestorePurchases}
        className="w-full py-3 rounded-xl border border-primary text-primary hover:bg-accent"
      >
        Restore Purchases
      </button>


      <div className="flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex gap-5 mt-3"
        >
          <button
            onClick={() => navigate('/highscores')}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            High Scores
          </button>
          <button
            onClick={() => navigate('/how-to-play')}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            How to Play
          </button>
          <button
            onClick={() => navigate('/about')}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-muted-foreground mt-3"
        >
          Internet required only when purchasing packs • No ads
        </motion.p>
      </div>

    </div>
  );
}
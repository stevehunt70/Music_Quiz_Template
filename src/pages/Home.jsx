import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import DecadeCard from "@/components/quiz/DecadeCard";
import { userHasPack, userHasAnyPaidPack } from "@/lib/purchases";
import logoFull from "../assets/vinyl_logo_invert.png";

export default function Home() {
  const navigate = useNavigate();

  const decades = [
    "1950s",
    "1960s",
    "1970s",
    "1980s",
    "1990s",
    "2000s",
    "2010s"
  ];

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

      {/* FREE PACK */}
      <DecadeCard
        decade="free"
        label="Free Pack"
        emoji="🎁"
        locked={false}
        onSelect={() =>
          navigate("/difficulty", { state: { decade: "free" } })
        }
      />

      {/* DECADE PACKS */}
      {decades.map((d) => (
        <DecadeCard
          key={d}
          decade={d}
          label={d}
          emoji="🎵"
          locked={!userHasPack(d)}
          onSelect={() => {
            if (!userHasPack(d)) return alert(`Purchase ${d} pack`);
            navigate("/difficulty", { state: { decade: d } });
          }}
        />
      ))}

      {/* ALL DECADES */}
      <DecadeCard
        decade="all"
        label="All Decades"
        emoji="🌍"
        locked={!userHasAnyPaidPack()}
        onSelect={() => {
          if (!userHasAnyPaidPack()) return alert("Purchase more packs");
          navigate("/difficulty", { state: { decade: "all" } });
        }}
      />

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
        No internet required • No ads
      </motion.p>
      </div>

    </div>
  );
}
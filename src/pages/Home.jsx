import { useNavigate } from "react-router-dom";
import DecadeCard from "@/components/quiz/DecadeCard";
import { userHasPack, userHasAnyPaidPack } from "@/lib/purchases";

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

    </div>
  );
}
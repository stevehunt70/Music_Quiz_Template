import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import logoFull from '../assets/vinyl_logo_invert.png'; 

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-center mb-8">
          <img            
            src={logoFull} className="mx-auto w-50 h-20 mb-2"
            alt="Sound and Vinyl Logo"
          />
          <h1 className="text-3xl font-heading font-bold tracking-tight mb-2">About</h1>
          <p className="text-muted-foreground text-sm">UK Chart Music Quiz</p>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border/50 bg-card">
            <p className="font-heading font-semibold text-foreground text-sm mb-1">What is this?</p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              A music trivia game focused on the UK singles chart. Test your knowledge of the hits that defined each decade, from the 1950s through to the 2010s.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-card">
            <p className="font-heading font-semibold text-foreground text-sm mb-1">The Questions</p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              All questions are based on real UK chart data. Questions span multiple difficulty levels — from well-known number ones to deep cuts only true fans will know.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-card">
            <p className="font-heading font-semibold text-foreground text-sm mb-1">No internet required</p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              All questions are built into the app. No ads, no tracking, no accounts needed. Just pure music trivia.
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">Made with 🎵 by Infineo Solutions</p>
      </motion.div>
    </div>
  );
}
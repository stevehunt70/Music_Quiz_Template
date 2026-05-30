import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import PageNotFound from './lib/PageNotFound'
import Home from './pages/Home'
import Difficulty from './pages/Difficulty'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import HowToPlay from './pages/HowToPlay'
import About from './pages/About'
import HighScores from './pages/HighScores'

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/difficulty" element={<Difficulty />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
          <Route path="/about" element={<About />} />
          <Route path="/highscores" element={<HighScores />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
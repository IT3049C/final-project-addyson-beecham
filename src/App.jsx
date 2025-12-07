import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./hub/LandingPage";

// Games
import RockPaperScissors from "./games/RockPaperScissors/RPS";
import TicTacToe from "./games/TicTacToe/TicTacToe";
import Wordle from "./games/Wordle/Wordle";
import Hangman from "./games/Hangman/Hangman";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          {/* Hub landing page */}
          <Route path="/" element={<LandingPage />} />

          {/* Games */}
          <Route path="/rps" element={<RockPaperScissors />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/wordle" element={<Wordle />} />
          <Route path="/hangman" element={<Hangman />} />
        </Routes>
      </main>
    </>
  );
}
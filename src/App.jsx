import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./hub/LandingPage";
import "./App.css";

// Games
import RockPaperScissors from "./games/RockPaperScissors/RPS";
import TicTacToe from "./games/TicTacToe/TicTacToe";
import Wordle from "./games/Wordle/Wordle";
import Hangman from "./games/Hangman/Hangman";
import CreateRoom from "./games/TicTacToe/CreateRoom";
import JoinRoom from "./games/TicTacToe/JoinRoom";
import TicTacToeRoom from "./games/TicTacToe/TicTacToeRoom";

export default function App() {
  return (
    <>
      <main className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/rps" element={<RockPaperScissors />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/tictactoe/create" element={<CreateRoom />} />
          <Route path="/tictactoe/join" element={<JoinRoom />} />
          <Route path="/tictactoe/room/:roomId" element={<TicTacToeRoom />} />
          <Route path="/wordle" element={<Wordle />} />
          <Route path="/hangman" element={<Hangman />} />
        </Routes>
      </main>
    </>
  );
}
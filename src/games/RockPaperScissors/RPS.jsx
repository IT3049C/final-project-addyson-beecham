// src/games/RockPaperScissors/RPS.jsx
import { useState, useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import "./RPS.css";

export default function RockPaperScissors() {
  const { playerName } = useContext(PlayerContext);
  const [result, setResult] = useState("");
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");

  const choices = ["Rock", "Paper", "Scissors"];

  const playRound = (choice) => {
    setPlayerChoice(choice);
    const comp = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(comp);

    if (choice === comp) setResult("It's a tie!");
    else if (
      (choice === "Rock" && comp === "Scissors") ||
      (choice === "Paper" && comp === "Rock") ||
      (choice === "Scissors" && comp === "Paper")
    ) setResult(`${playerName || "You"} win!`);
    else setResult("Computer wins!");
  };

  const resetGame = () => {
    setResult("");
    setPlayerChoice("");
    setComputerChoice("");
  };

  return (
    <div className="rps">
      <h2>Rock Paper Scissors</h2>
      <p>Choose your move</p>
      {playerName && <p>Player: {playerName}</p>}
      <div className="choices">
        {choices.map((c) => (
          <button key={c} onClick={() => playRound(c)}>{c}</button>
        ))}
      </div>
      {result && (
        <div className="results">
          <p>Result</p>
          <p>You chose: {playerChoice}</p>
          <p>Computer chose: {computerChoice}</p>
          <p>{result}</p>
          <button onClick={resetGame}>Reset</button>
        </div>
      )}
    </div>
  );
}
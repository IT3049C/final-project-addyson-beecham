import { useState, useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import "./RPS.css";
import { CHOICES, randomChoice, roundResultText } from "./utils";

export default function RockPaperScissors() {
  const { playerName } = useContext(PlayerContext);
  const [result, setResult] = useState("");
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");

  const playRound = (choice) => {
    setPlayerChoice(choice);
    const comp = randomChoice();
    setComputerChoice(comp);

    setResult(roundResultText(playerName, choice, comp));
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
        {CHOICES.map((c) => (
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
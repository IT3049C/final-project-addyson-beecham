import { useState, useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { isValidGuess, getFeedback, isCorrectGuess, resetGame } from "./utils";
import "./Wordle.css";

export default function Wordle() {
  const { playerName } = useContext(PlayerContext);
  const [targetWord] = useState("react"); // static for demo
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidGuess(currentGuess)) return;

    const feedback = getFeedback(currentGuess, targetWord);
    const newGuesses = [...guesses, { word: currentGuess, feedback }];
    setGuesses(newGuesses);

    if (isCorrectGuess(currentGuess, targetWord)) {
      setResult(`${playerName || "You"} guessed correctly!`);
    } else if (newGuesses.length >= 6) {
      setResult(`Game over! The word was ${targetWord}.`);
    }

    setCurrentGuess("");
  };

  const handleReset = () => {
    const { guesses, result, currentGuess } = resetGame();
    setGuesses(guesses);
    setResult(result);
    setCurrentGuess(currentGuess);
  };

  return (
    <div className="wordle">
      <h2>Wordle</h2>
      {playerName && <p>Player: {playerName}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="guess">Enter a guess:</label>
        <input
          id="guess"
          type="text"
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
          maxLength={5}
        />
        <button type="submit">Submit</button>
      </form>

      <div className="guesses">
        {guesses.map((g, i) => (
          <p key={i}>
            {g.word.split("").map((letter, j) => (
              <span key={j} className={g.feedback[j]}>
                {letter}
              </span>
            ))}
          </p>
        ))}
      </div>

      {result && <p className="result">{result}</p>}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
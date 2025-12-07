import { useState, useContext, useEffect } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { isValidGuess, getFeedback, isCorrectGuess, resetGame, getRandomWord } from "./utils";
import "./wordle.css";

export default function Wordle() {
  const { playerName } = useContext(PlayerContext);
  const [targetWord, setTargetWord] = useState(() => getRandomWord());
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
    setTargetWord(getRandomWord());
  };

  useEffect(() => {
    function onKey(e) {
      if (document.activeElement && document.activeElement.id === 'guess') return;
      if (result) return; 
      const key = e.key;

      if (key === "Enter") {
        if (isValidGuess(currentGuess) && guesses.length < 6) {
          const feedback = getFeedback(currentGuess, targetWord);
          const newGuesses = [...guesses, { word: currentGuess, feedback }];
          setGuesses(newGuesses);

          if (isCorrectGuess(currentGuess, targetWord)) {
            setResult(`${playerName || "You"} guessed correctly!`);
          } else if (newGuesses.length >= 6) {
            setResult(`Game over! The word was ${targetWord}.`);
          }

          setCurrentGuess("");
        }
        return;
      }

      if (key === "Backspace") {
        setCurrentGuess((s) => s.slice(0, -1));
        return;
      }
      if (/^[a-zA-Z]$/.test(key)) {
        setCurrentGuess((s) => {
          if (s.length >= 5) return s;
          return (s + key.toLowerCase()).slice(0, 5);
        });
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentGuess, guesses, result, targetWord, playerName]);

  return (
    <div className="wordle">
      <h2>Wordle</h2>
      {playerName && <p>Player: {playerName}</p>}
      <form onSubmit={handleSubmit} className="wordle-form">
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

      <div id="wordle-grid" className="wordle-board" aria-label="Wordle grid">
        {Array.from({ length: 6 }).map((_, row) => {
          const guess = guesses[row] ? guesses[row].word : "";
          const feedback = guesses[row] ? guesses[row].feedback : [];
          return (
            <div key={row} className="wordle-row">
              {Array.from({ length: 5 }).map((__, col) => {
                const letter = guess[col] || "";
                const status = feedback[col] || "";
                return (
                  <div key={col} className={`letter ${status}`} aria-hidden={letter === ""}>
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {result && <p className="result">{result}</p>}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
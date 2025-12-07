import { useState, useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import "./Hangman.css";
import { getDisplayWord, isGameWon, isGameLost, resetGame, getRandomWord } from "./utils";

export default function Hangman() {
  const { playerName } = useContext(PlayerContext);
  const urlSeed = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('seed') : null;
  const [targetWord, setTargetWord] = useState<string>(urlSeed || getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);
  const maxWrong = 6;

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter)) return;

    setGuessedLetters([...guessedLetters, letter]);

    if (!targetWord.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const handleReset = () => {
    const { guessedLetters, wrongGuesses, targetWord: newWord } = resetGame();
    setGuessedLetters(guessedLetters);
    setWrongGuesses(wrongGuesses);
    setTargetWord(urlSeed || newWord);
  };

  const displayWord = getDisplayWord(targetWord, guessedLetters);
  const won = isGameWon(displayWord, targetWord);
  const lost = isGameLost(wrongGuesses, maxWrong);

  return (
    <div className="hangman">
      <h2>Hangman</h2>
      <p>Guess a letter</p>
      {playerName && <p>Player: {playerName}</p>}
      <p className="word" data-testid="hangman-display">{displayWord}</p>
      <p>Wrong guesses: {wrongGuesses} / {maxWrong}</p>

      <div className="letters">
        {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
          <button
            key={letter}
            data-testid={`hangman-letter-${letter}`}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter) || won || lost}
          >
            {letter}
          </button>
        ))}
      </div>

      {won && <p className="result">You win!</p>}
      {lost && <p className="result">Game over! The word was {targetWord}.</p>}

      <button data-testid="hangman-reset" onClick={handleReset}>Reset</button>
    </div>
  );
}
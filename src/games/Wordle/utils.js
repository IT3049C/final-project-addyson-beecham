// Utility helpers for the Wordle game

export function isValidGuess(guess) {
  return typeof guess === "string" && guess.length === 5;
}

export function getFeedback(guess, target) {
  const feedback = Array(5).fill("absent");
  const targetLetters = target.split("");

  // Mark correct letters first
  for (let i = 0; i < 5; i++) {
    if (guess[i] === target[i]) {
      feedback[i] = "correct";
      targetLetters[i] = null;
    }
  }

  // Mark present letters
  for (let i = 0; i < 5; i++) {
    if (feedback[i] === "correct") continue;
    const idx = targetLetters.indexOf(guess[i]);
    if (idx !== -1) {
      feedback[i] = "present";
      targetLetters[idx] = null;
    }
  }

  return feedback;
}

export function isCorrectGuess(guess, target) {
  return guess === target;
}

export function resetGame() {
  return {
    guesses: [],
    result: "",
    currentGuess: "",
  };
}
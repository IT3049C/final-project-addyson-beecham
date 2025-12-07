export function isValidGuess(guess) {
  return typeof guess === "string" && guess.length === 5;
}

export const WORDS = [
  "react",
  "apple",
  "angle",
  "brace",
  "crane",
  "delta",
  "frame",
  "grace",
  "hotel",
  "input",
  "joker",
  "karma",
  "lemon",
  "mango",
  "north",
  "ocean",
  "pride",
  "query",
  "river",
  "shine",
];

export function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

export function getFeedback(guess, target) {
  const feedback = Array(5).fill("incorrect");
  const targetLetters = target.split("");

  for (let i = 0; i < 5; i++) {
    if (guess[i] === target[i]) {
      feedback[i] = "correct";
      targetLetters[i] = null;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (feedback[i] === "correct") continue;
    const idx = targetLetters.indexOf(guess[i]);
    if (idx !== -1) {
      feedback[i] = "misplaced";
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
const WORDS = [
  "react",
  "javascript",
  "programming",
  "hangman",
  "computer",
  "developer",
  "coding",
  "algorithm",
  "database",
  "function",
  "variable",
  "constant",
  "framework",
  "library",
  "project",
  "website",
  "application",
  "software",
  "hardware",
  "network",
];

export function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

export function getDisplayWord(targetWord, guessedLetters) {
  return targetWord
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
}

export function isGameWon(displayWord, targetWord) {
  return displayWord.replace(/\s/g, "") === targetWord;
}

export function isGameLost(wrongGuesses, maxWrong) {
  return wrongGuesses >= maxWrong;
}

export function resetGame() {
  return {
    guessedLetters: [],
    wrongGuesses: 0,
    targetWord: getRandomWord(),
  };
}
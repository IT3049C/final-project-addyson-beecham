// Show word with underscores for unguessed letters
export function getDisplayWord(targetWord, guessedLetters) {
  return targetWord
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
}

// Check if player has won
export function isGameWon(displayWord, targetWord) {
  return displayWord.replace(/\s/g, "") === targetWord;
}

// Check if player has lost
export function isGameLost(wrongGuesses, maxWrong) {
  return wrongGuesses >= maxWrong;
}

// Reset game state
export function resetGame() {
  return {
    guessedLetters: [],
    wrongGuesses: 0,
  };
}
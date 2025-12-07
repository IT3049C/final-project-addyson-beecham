export async function getRandomWord() {
  try {
    const resp = await fetch(`https://it3049c-hangman.fly.dev/api/random-word`);
    if (resp.ok) {
      const data = await resp.json();
      if (data.word) return data.word.toLowerCase();
    }
  } catch (e) {
  }
  return "hangman";
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

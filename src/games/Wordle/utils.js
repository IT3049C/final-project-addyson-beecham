export async function isValidGuess(guess) {
  if (typeof guess !== "string" || guess.length !== 5) return false;

  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(guess)}`
    );
    return res.ok;
  } catch (e) {
    return false;
  }
}

export async function getRandomWord() {
  try {
    const resp = await fetch(`https://random-word-api.herokuapp.com/word?length=5`);
    if (resp.ok) {
      const data = await resp.json();
      if (Array.isArray(data) && data.length > 0) return data[0].toLowerCase();
    }
  } catch (e) {
  }

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

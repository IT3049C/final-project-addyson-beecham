export const CHOICES = ["Rock", "Paper", "Scissors"];

export function randomChoice() {
	const i = Math.floor(Math.random() * CHOICES.length);
	return CHOICES[i];
}

export function isValidChoice(choice) {
	return CHOICES.includes(choice);
}

const BEATS = {
	Rock: "Scissors",
	Paper: "Rock",
	Scissors: "Paper",
};

export function decideWinner(playerChoice, computerChoice) {
	if (playerChoice === computerChoice) {
		return { winner: "tie", message: "It's a tie!" };
	}

	if (BEATS[playerChoice] === computerChoice) {
		return { winner: "player", message: `${playerChoice} beats ${computerChoice}` };
	}

	return { winner: "computer", message: `${computerChoice} beats ${playerChoice}` };
}

export function roundResultText(playerName, playerChoice, computerChoice) {
	const res = decideWinner(playerChoice, computerChoice);
	if (res.winner === "tie") return "It's a tie!";
	if (res.winner === "player") return `${playerName || "You"} win!`;
	return "Computer wins!";
}

export default {
	CHOICES,
	randomChoice,
	isValidChoice,
	decideWinner,
	roundResultText,
};


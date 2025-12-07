// Check if there's a winner on the board
export function checkWinner(board) {
  const combos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (let [a, b, c] of combos) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // "X" or "O"
    }
  }
  return "";
}

// Check if the board is full (tie game)
export function isBoardFull(board) {
  return board.every(cell => cell !== "");
}

// Reset the board to its initial state
export function resetBoard() {
  return Array(9).fill("");
}

// Get the next player symbol
export function getNextPlayer(isXTurn) {
  return isXTurn ? "X" : "O";
}
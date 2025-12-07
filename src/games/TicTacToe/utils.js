export function checkWinner(board) {
  const combos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
  ];

  for (let [a, b, c] of combos) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; 
    }
  }
  return "";
}

export function isBoardFull(board) {
  return board.every(cell => cell !== "");
}

export function resetBoard() {
  return Array(9).fill("");
}

export function getNextPlayer(isXTurn) {
  return isXTurn ? "X" : "O";
}
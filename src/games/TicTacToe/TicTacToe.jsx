import { useState, useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { checkWinner, isBoardFull, resetBoard, getNextPlayer } from "./utils";
import "./TicTacToe.css";

export default function TicTacToe() {
  const { playerName } = useContext(PlayerContext);
  const [board, setBoard] = useState(resetBoard());
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState("");

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = getNextPlayer(isXTurn);
    setBoard(newBoard);
    setIsXTurn(!isXTurn);

    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
    } else if (isBoardFull(newBoard)) {
      setWinner("Tie");
    }
  };

  const resetGame = () => {
    setBoard(resetBoard());
    setIsXTurn(true);
    setWinner("");
  };

  return (
    <div className="tictactoe">
      <h2>Tic Tac Toe</h2>
      {playerName && <p>Player: {playerName}</p>}
      <div className="board">
        {board.map((cell, i) => (
          <button key={i} data-testid={`cell-${i}`} onClick={() => handleClick(i)}>{cell}</button>
        ))}
      </div>
      {winner && <p className="winner">Winner: {winner}</p>}
      <button data-testid="tictactoe-reset" onClick={resetGame}>Reset</button>
    </div>
  );
}
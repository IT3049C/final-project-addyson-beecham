import { useState, useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { checkWinner, isBoardFull, resetBoard, getNextPlayer } from "./utils";
import "./TicTacToe.css";
import { Link } from "react-router-dom";

export default function TicTacToe() {
  const { playerName } = useContext(PlayerContext);
  const [board, setBoard] = useState(resetBoard());
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState("");
  const [isMultiplayer, setIsMultiplayer] = useState(false);
  const [player1Name, setPlayer1Name] = useState(playerName || "Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");

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

  const startMultiplayer = () => {
    setIsMultiplayer(true);
    resetGame();
  };

  const backToMenu = () => {
    setIsMultiplayer(false);
    resetGame();
  };

  return (
    <div className="tictactoe">
      <h2>Tic Tac Toe</h2>
      {playerName && <p>Player: {playerName}</p>}

      {!isMultiplayer ? (
        <div className="mode-menu">
          <p>Choose a game mode:</p>
          <button onClick={startMultiplayer}>Local Multiplayer (2 Players)</button>
          <div style={{ marginTop: '1rem' }}>
            <p>Or play online with a friend:</p>
            <Link to="/tictactoe/create"><button>Create Online Room</button></Link>
            <Link to="/tictactoe/join" style={{ marginLeft: '0.5rem' }}><button>Join Online Room</button></Link>
          </div>
        </div>
      ) : (
        <>
          <div className="multiplayer-info">
            <p>
              <strong>{isXTurn ? player1Name : player2Name}</strong>'s turn (
              {isXTurn ? "X" : "O"})
            </p>
          </div>
          <div className="board">
            {board.map((cell, i) => (
              <button
                key={i}
                data-testid={`cell-${i}`}
                onClick={() => handleClick(i)}
              >
                {cell}
              </button>
            ))}
          </div>
          {winner && (
            <p className="winner">
              {winner === "Tie" ? "It's a Tie!" : `${winner === "X" ? player1Name : player2Name} Wins!`}
            </p>
          )}
          <button data-testid="tictactoe-reset" onClick={resetGame}>
            Reset Game
          </button>
          <button onClick={backToMenu}>Back to Mode Menu</button>
        </>
      )}
    </div>
  );
}
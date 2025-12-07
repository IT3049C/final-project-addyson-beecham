import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as api from "./api";
import "./TicTacToe.css";
import { checkWinner, isBoardFull } from "./utils";
import { resetBoard } from "./utils";

export default function TicTacToeRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [gameState, setGameState] = useState(null);
  const [error, setError] = useState(null);
  const pollingRef = useRef(null);

  const localSymbol = sessionStorage.getItem(`tictactoe-${roomId}`) || null;

  const fetchState = async () => {
    try {
      const data = await api.getRoom(roomId);
      setGameState(data.gameState || data);
    } catch (err) {
      setError(err.message || "Failed to fetch room");
    }
  };

  useEffect(() => {
    fetchState();
    pollingRef.current = setInterval(fetchState, 1000);
    return () => clearInterval(pollingRef.current);
  }, [roomId]);

  const handleCellClick = async (index) => {
    if (!gameState) return;
    const { board, currentPlayer } = gameState;
    const winnerNow = checkWinner(board);
    if (winnerNow || isBoardFull(board)) return;
    if (!localSymbol) return; 
    if (currentPlayer !== localSymbol) return; 
    if (board[index]) return; 

    const newBoard = [...board];
    newBoard[index] = localSymbol;
    const nextPlayer = localSymbol === "X" ? "O" : "X";
    const updated = { board: newBoard, currentPlayer: nextPlayer };
    try {
      await api.updateRoom(roomId, updated);
      setGameState(updated);
    } catch (err) {
      setError(err.message || "Failed to update room");
    }
  };

  const leave = () => {
    (async () => {
      try {
        const current = gameState || { board: resetBoard(), currentPlayer: 'X' };
        const message = localSymbol ? `${localSymbol} left the room.` : `A player left the room.`;
        await api.updateRoom(roomId, { ...current, message });
      } catch (err) {
      } finally {
        sessionStorage.removeItem(`tictactoe-${roomId}`);
        navigate('/tictactoe');
      }
    })();
  };

  const resetRoom = async () => {
    try {
      const initial = { board: resetBoard(), currentPlayer: 'X' };
      await api.updateRoom(roomId, initial);
      setGameState(initial);
    } catch (err) {
      setError(err.message || 'Failed to reset room');
    }
  };

  if (error) return <div><p style={{color: 'red'}}>Error: {error}</p><button onClick={leave}>Back</button></div>;
  if (!gameState) return <div>Loading room...</div>;

  const { board, currentPlayer } = gameState;
  const winner = checkWinner(board);
  const tie = !winner && isBoardFull(board);

  return (
    <div className="tictactoe">
      <h2>Online Tic Tac Toe — Room {roomId}</h2>
      <p>You are: <strong>{localSymbol || 'Spectator'}</strong></p>
      {gameState.message && <p className="room-message">{gameState.message}</p>}
      <p>Current turn: <strong>{currentPlayer}</strong></p>
      <div className="board">
        {board.map((cell, i) => (
          <button
            key={i}
            data-testid={`cell-${i}`}
            onClick={() => handleCellClick(i)}
            disabled={!localSymbol || currentPlayer !== localSymbol || !!cell || !!winner || tie}
          >
            {cell}
          </button>
        ))}
      </div>
      {winner && <p className="winner">{winner} wins!</p>}
      {tie && <p className="winner">It's a Tie!</p>}
      <div className="controls">
        <button onClick={resetRoom}>Reset Room</button>
        <button onClick={leave}>Leave Room</button>
      </div>
    </div>
  );
}

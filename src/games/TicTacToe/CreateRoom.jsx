import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "./api";
import { resetBoard } from "./utils";

export default function CreateRoom() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreate = async () => {
    setLoading(true);
    setError(null);
    try {
      const initialState = { board: resetBoard(), currentPlayer: "X" };
      const data = await api.createRoom(initialState);
      const roomId = data.roomId || data.id || (data.room && data.room.id);
      sessionStorage.setItem(`tictactoe-${roomId}`, "X");
      navigate(`/tictactoe/room/${roomId}`);
    } catch (err) {
      setError(err.message || "Failed to create room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Create Online Room</h3>
      <p>Create a room to invite another player. Share the room code.</p>
      <button onClick={handleCreate} disabled={loading}>
        {loading ? "Creating..." : "Create Room"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

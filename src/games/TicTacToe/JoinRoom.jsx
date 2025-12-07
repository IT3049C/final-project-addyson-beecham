import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "./api";

export default function JoinRoom() {
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await api.getRoom(roomId.trim());
      if (!data) throw new Error("Room not found");
      sessionStorage.setItem(`tictactoe-${roomId}`, "O");
      navigate(`/tictactoe/room/${roomId}`);
    } catch (err) {
      setError(err.message || "Failed to join room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Join Online Room</h3>
      <form onSubmit={handleJoin}>
        <label>
          Room Code:
          <input value={roomId} onChange={(e) => setRoomId(e.target.value)} />
        </label>
        <button type="submit" disabled={loading || !roomId.trim()}>
          {loading ? "Joining..." : "Join Room"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

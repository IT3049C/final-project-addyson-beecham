import { useState, useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

export default function PlayerNameForm() {
  const [input, setInput] = useState("");
  const { playerName, setPlayerName } = useContext(PlayerContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) setPlayerName(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="player-form">
      <label htmlFor="playerName">Player name</label>
      <input
        id="playerName"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your name"
      />
      <button type="submit">Start</button>

      {playerName && <p>Welcome, {playerName}!</p>}
    </form>
  );
}

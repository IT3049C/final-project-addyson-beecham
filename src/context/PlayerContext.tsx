import { createContext, useEffect, useState, ReactNode } from "react";

interface PlayerContextType {
  playerName: string;
  setPlayerName: React.Dispatch<React.SetStateAction<string>>;
}

export const PlayerContext = createContext<PlayerContextType>({
  playerName: "",
  setPlayerName: (() => {}) as React.Dispatch<React.SetStateAction<string>>,
});

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [playerName, setPlayerName] = useState<string>(() => {
    // Optional: persist name across reloads
    return localStorage.getItem("playerName") || "";
  });

  useEffect(() => {
    localStorage.setItem("playerName", playerName);
  }, [playerName]);

  return (
    <PlayerContext.Provider value={{ playerName, setPlayerName }}>
      {children}
    </PlayerContext.Provider>
  );
}
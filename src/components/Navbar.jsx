import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav aria-label="Main navigation">
      <h1>Game Hub</h1>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none", padding: 0 }}>
        <li>
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/rps" className={({ isActive }) => (isActive ? "active" : "")}>
            Rock Paper Scissors
          </NavLink>
        </li>
        <li>
          <NavLink to="/tictactoe" className={({ isActive }) => (isActive ? "active" : "")}>
            Tic Tac Toe
          </NavLink>
        </li>
        <li>
          <NavLink to="/wordle" className={({ isActive }) => (isActive ? "active" : "")}>
            Wordle
          </NavLink>
        </li>
        <li>
          <NavLink to="/hangman" className={({ isActive }) => (isActive ? "active" : "")}>
            Hangman
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

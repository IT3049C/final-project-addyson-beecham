import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App";
import { PlayerProvider } from "./context/PlayerContext";
import "./index.css";

const isProd = import.meta.env.MODE === "production";
const Router = isProd ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router basename={isProd ? undefined : import.meta.env.BASE_URL}>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </Router>
  </React.StrictMode>
);
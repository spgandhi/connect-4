import React from "react";
import "./App.css";
import Header from "./views/header/Header";
import Game from "./views/game/Game";

function App() {
  return (
    <div className="App flex flex-col justify-center items-center mx-auto">
      <Header />
      <Game />
    </div>
  );
}

export default App;

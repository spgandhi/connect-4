import React from "react";
import Header from "./header/Header";
import Game from "./game/Game";

function App() {
  return (
    <div className="App flex flex-col justify-center items-center mx-auto">
      <Header />
      <Game />
    </div>
  );
}

export default App;

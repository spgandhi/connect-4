import React from "react";
import Board from "./Board";

interface Props {}

function Game(props: Props) {
  const {} = props;

  return (
    <div>
      <Board rows={6} columns={7} />
    </div>
  );
}

export default Game;

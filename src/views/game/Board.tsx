import React from "react";
import Cell from "./Cell";

interface Props {
  rows: number;
  columns: number;
}

function Board(props: Props) {
  const { rows, columns } = props;

  return (
    <div className="flex flex-col gap-y-4">
      {Array.from(Array(rows).keys()).map((rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-x-4">
          {Array.from(Array(columns).keys()).map((colIndex) => (
            <Cell key={`cell-${rowIndex}-${colIndex}`} color={"red"} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;

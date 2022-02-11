import React from "react";
import { existsIn2DArray } from "../../utils/utils";
import Cell from "./Cell";

interface Props {
  rows: number;
  columns: number;
  player1Moves: number[][];
  player2Moves: number[][];
  onCellClick: (cellName: number) => void;
}

function Board(props: Props) {
  const { rows, columns, onCellClick, player1Moves, player2Moves } = props;

  const getCellColor = (cellName: [number, number]) => {
    if (existsIn2DArray(player1Moves, cellName)) {
      return "red";
    } else if (existsIn2DArray(player2Moves, cellName)) {
      return "blue";
    } else {
      return "white";
    }
  };

  return (
    <div className="flex flex-col-reverse gap-y-4">
      {Array.from(Array(rows).keys()).map((rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-x-4">
          {Array.from(Array(columns).keys()).map((colIndex) => (
            <Cell
              onClick={() => onCellClick(colIndex)}
              key={`cell-${rowIndex}-${colIndex}`}
              color={getCellColor([rowIndex, colIndex])}
            >
              {rowIndex}
              {colIndex}
            </Cell>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;

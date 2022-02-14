import React from "react";
import { existsIn2DArray } from "../../utils/utils";
import Cell from "./Cell";

interface Props {
  rows: number;
  columns: number;
  player1Moves: number[][];
  player2Moves: number[][];
  winningSegment: number[][];
  onColumnClick: (cellName: number) => void;
}

function Board(props: Props) {
  const {
    rows,
    columns,
    onColumnClick,
    player1Moves,
    player2Moves,
    winningSegment,
  } = props;

  const isWinningCell = (cell: number[]) => {
    return existsIn2DArray(winningSegment, cell);
  };

  const getPlayerCellClassName = (cell: number[]) => {
    if (existsIn2DArray(player1Moves, cell)) {
      return "player-1-cell";
    } else if (existsIn2DArray(player2Moves, cell)) {
      return "player-2-cell";
    } else {
      return "white";
    }
  };

  return (
    <div className="inline-flex flex-row gap-x-4 bg-green-500 p-4  rounded-xl">
      {Array.from(Array(columns).keys()).map((colIndex) => (
        <div
          key={`row-${colIndex}`}
          className="flex flex-col-reverse gap-y-4 cursor-pointer"
          onClick={() => onColumnClick(colIndex)}
        >
          {Array.from(Array(rows).keys()).map((rowIndex) => (
            <Cell
              key={`cell-${rowIndex}-${colIndex}`}
              className={`${getPlayerCellClassName([rowIndex, colIndex])}${
                isWinningCell([rowIndex, colIndex]) ? " winning-cell" : ""
              }`}
            ></Cell>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;

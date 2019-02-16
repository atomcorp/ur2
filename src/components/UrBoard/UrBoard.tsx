import React from "react";
import { Board, Square, BoardRow } from "../";

const BOARD_KEYS = Array(3)
  .fill(0)
  .map((_, i) =>
    Array(8)
      .fill(0)
      .map((_, x) => String.fromCharCode(97 + i) + x)
  );

const UrBoard = () => (
  <Board>
    {BOARD_KEYS.map((row, i) => (
      <BoardRow key={i}>
        {row.map(squareId => (
          <Square key={squareId} id={squareId}>
            {squareId}
          </Square>
        ))}
      </BoardRow>
    ))}
  </Board>
);

export default UrBoard;

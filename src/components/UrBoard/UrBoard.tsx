import React from 'react';
import { Board, Square, BoardRow, Token } from '../';
import { BOARD_KEYS } from '../../utilities/boardHelpers';

type positionsType = {
  [key: string]: boolean;
};

const POSITIONS: positionsType = {
  b0: true
};

const UrBoard = () => (
  <Board>
    {BOARD_KEYS.map((row, i) => (
      <BoardRow key={i}>
        {row.map((squareId) => (
          <Square key={squareId} id={squareId}>
            {POSITIONS[squareId] ? <Token /> : squareId}
          </Square>
        ))}
      </BoardRow>
    ))}
  </Board>
);

export default UrBoard;

import React from 'react';
import { Square, BoardRow, Token } from '..';
import { BOARD_KEYS } from '../../utilities/boardHelpers';

const Board: React.FC = (props) => (
  <section>
    {BOARD_KEYS.map((row, i) => (
      <BoardRow key={i}>
        {row.map((squareId) => (
          <Square key={squareId}>
            {typeof props.children === 'function' && props.children(squareId)}
          </Square>
        ))}
      </BoardRow>
    ))}
  </section>
);

export default Board;

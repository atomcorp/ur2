import React from 'react';
import { Square, BoardRow, Token } from '..';
import { boardKeys } from '../../utilities/boardHelpers';
import { PositionType } from '../../types';

const Board: React.FC = (props) => (
  <section>
    {boardKeys.map((row: PositionType[], i: number) => (
      <BoardRow key={i}>
        {row.map((squareId: PositionType) => (
          <Square key={squareId} id={squareId}>
            {typeof props.children === 'function' && props.children(squareId)}
          </Square>
        ))}
      </BoardRow>
    ))}
  </section>
);

export default Board;

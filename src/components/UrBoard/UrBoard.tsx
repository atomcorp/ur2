import React from 'react';
import { connect } from 'react-redux';
import { Board, Square, BoardRow, Token } from '../';
import { BOARD_KEYS } from '../../utilities/boardHelpers';

type UrBoardProps = {
  positions: { [key: string]: string };
};

const UrBoard = (props: UrBoardProps) => (
  <Board>
    {BOARD_KEYS.map((row, i) => (
      <BoardRow key={i}>
        {row.map((squareId) => (
          <Square key={squareId}>
            {props.positions[squareId] ? (
              <Token id={props.positions[squareId]} />
            ) : (
              squareId
            )}
          </Square>
        ))}
      </BoardRow>
    ))}
  </Board>
);

type state = {
  board: { positions: { [key: string]: string } };
};

export default connect((state: state) => ({
  positions: state.board.positions
}))(UrBoard);

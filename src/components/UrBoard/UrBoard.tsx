import React from 'react';
import { connect } from 'react-redux';
import { Board, Square, BoardRow, Token } from '../';
import { BOARD_KEYS } from '../../utilities/boardHelpers';
import { TokenType } from '../../types';

type UrBoardProps = {
  positions: {
    [key: string]: TokenType;
  };
};

const UrBoard = (props: UrBoardProps) => (
  <Board>
    {BOARD_KEYS.map((row, i) => (
      <BoardRow key={i}>
        {row.map((squareId) => (
          <Square key={squareId}>
            {props.positions[squareId] ? (
              <Token token={props.positions[squareId]} />
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
  board: {
    positions: {
      [key: string]: TokenType;
    };
  };
};

export default connect((state: state) => ({
  positions: state.board.positions
}))(UrBoard);

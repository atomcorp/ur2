import React from 'react';
import { connect } from 'react-redux';
import { Token, Board } from '..';

import { TokenType } from '../../types';

type UrProps = {
  positions: {
    [key: string]: TokenType;
  };
  // squareId: string;
};

const Ur: React.FC<UrProps> = (props) => (
  <Board>
    {(squareId: string) =>
      props.positions[squareId] ? (
        <Token token={props.positions[squareId]} />
      ) : (
        squareId
      )
    }
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
}))(Ur);

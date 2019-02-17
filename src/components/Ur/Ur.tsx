import React from 'react';
import { connect } from 'react-redux';
import { Token, Board } from '..';

import { TokenType, PLAYER } from '../../types';

type UrProps = {
  positions: {
    [key: string]: TokenType;
  };
  previewPosition: {
    [key: string]: PLAYER;
  };
  // squareId: string;
};

const Ur: React.FC<UrProps> = (props) => (
  <Board>
    {(squareId: string) => {
      if (props.previewPosition[squareId]) {
        return (
          <Token
            previewed
            token={{ player: props.previewPosition[squareId], piece: 0 }}
          />
        );
      }
      if (props.positions[squareId]) {
        return <Token token={props.positions[squareId]} />;
      }
      return squareId;
    }}
  </Board>
);

type state = {
  board: {
    positions: {
      [key: string]: TokenType;
    };
    previewPosition: {
      [key: string]: PLAYER;
    };
  };
};

export default connect((state: state) => ({
  positions: state.board.positions,
  previewPosition: state.board.previewPosition
}))(Ur);

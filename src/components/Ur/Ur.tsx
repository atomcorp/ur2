import React from 'react';
import { connect } from 'react-redux';
import { Token, Board } from '..';

import { TokenType, PLAYER, PositionType } from '../../types';

type UrProps = {
  positions: { [key in PositionType]: TokenType };
  previewPosition: { [key in PositionType]: PLAYER };
  // squareId: string;
};

const Ur: React.FC<UrProps> = (props) => (
  <Board>
    {(squareId: PositionType) => {
      if (props.previewPosition[squareId]) {
        return (
          <Token
            previewed
            token={{ player: props.previewPosition[squareId], piece: 0 }}
          />
        );
      }
      if (props.positions[squareId]) {
        return <Token token={props.positions[squareId]} squareId={squareId} />;
      }
      return squareId;
    }}
  </Board>
);

type state = {
  board: {
    positions: { [key in PositionType]: TokenType };
    previewPosition: { [key in PositionType]: PLAYER };
  };
};

export default connect((state: state) => ({
  positions: state.board.positions,
  previewPosition: state.board.previewPosition
}))(Ur);

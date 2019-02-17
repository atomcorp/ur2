import React from 'react';
import { connect } from 'react-redux';

import { Token } from '../';
import { TokenType } from '../../types';
import { voidFn } from '../../utilities/helpers';

type AreaProps = {
  title: string;
  tokens: [TokenType];
  type: 'startArea' | 'finishArea';
  onMouseOver?: () => void;
  onClick?: () => void;
};

const Area: React.FC<AreaProps> = (props) => (
  <section onMouseOver={props.onMouseOver} onClick={props.onClick}>
    {props.title}
    {props.tokens.map((token) => (
      <Token key={token.player + token.piece} token={token} />
    ))}
  </section>
);

type ConnectState = {
  playerOne: {
    startArea: [TokenType];
    finishArea: [TokenType];
  };
  playerTwo: {
    startArea: [TokenType];
    finishArea: [TokenType];
  };
};

type ConnectProps = {
  player: 'playerOne' | 'playerTwo';
  type: 'startArea' | 'finishArea';
};

export default connect((state: ConnectState, ownProps: ConnectProps) => ({
  tokens: state[ownProps.player][ownProps.type]
}))(Area);

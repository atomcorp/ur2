import React from 'react';
import { connect } from 'react-redux';

import { Token } from '../';
import { TokenType } from '../../types';

type AreaProps = { title: string; tokens: [TokenType] };

const Area: React.FC<AreaProps> = (props) => (
  <section>
    {props.title}
    {props.tokens.map((token) => (
      <Token token={token} />
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

import React from 'react';
import { TokenType } from '../../types';
import { PLAYER } from '../../utilities/playerHelpers';
import css from './Token.module.css';

type TokenProps = {
  token: TokenType;
  previewed?: boolean;
};

const Token: React.FC<TokenProps> = (props) => (
  <section className={`${css.container} ${props.previewed ? css.preview : ''}`}>
    {props.token.player === PLAYER.ONE ? '♟' : '♙'}
  </section>
);

export default Token;

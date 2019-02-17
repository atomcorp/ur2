import React from 'react';
import { TokenType } from '../../types';
import { PLAYER } from '../../utilities/playerHelpers';
import css from './Token.module.css';

type TokenProps = {
  token: TokenType;
};

const Token = (props: TokenProps) => (
  <section className={css.container}>
    {props.token.player === PLAYER.ONE ? '♟' : '♙'}
  </section>
);

export default Token;

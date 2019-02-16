import React from 'react';
import css from './Token.module.css';

type TokenProps = {
  id: string;
};

const Token = (props: TokenProps) => (
  <section className={css.container}>⛀</section>
);

export default Token;

import React from 'react';
import css from './Square.module.css';

type SquareProps = {
  id: String;
};

const Square: React.FC<SquareProps> = (props) => (
  <section className={css.container}>{props.children}</section>
);

export default Square;

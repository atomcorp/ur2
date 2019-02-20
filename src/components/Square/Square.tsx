import React from 'react';
import css from './Square.module.css';

import { PositionType } from '../../types';

type SquareProps = {
  id: PositionType;
};

const Square: React.FC<SquareProps> = (props) => (
  <section className={css.container}>{props.children}</section>
);

export default Square;

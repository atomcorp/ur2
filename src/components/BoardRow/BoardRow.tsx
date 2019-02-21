import React from 'react';
import css from './BoardRow.module.css';

const BoardRow: React.FC = (props) => (
  <section className={css.container}>{props.children}</section>
);

export default BoardRow;

import React from 'react';
import { connect } from 'react-redux';

import { rollDiceThunk } from '../../store/reducers/diceReducer';

const Die: React.FC<{ isOne: boolean }> = ({ isOne }) => (
  <div>{isOne ? '🞕' : '◻'}</div>
);

type DiceProps = {
  faces: [number];
  rollDiceThunk: () => void;
};

const Dice: React.FC<DiceProps> = (props) => (
  <section>
    {props.faces.map((die, i) => (
      <Die key={i} isOne={die === 1 ? true : false} />
    ))}
    <button onClick={props.rollDiceThunk}>Roll</button>
  </section>
);

type StateProps = {
  dice: {
    faces: [number];
  };
};

export default connect(
  (state: StateProps) => ({
    faces: state.dice.faces
  }),
  { rollDiceThunk }
)(Dice);

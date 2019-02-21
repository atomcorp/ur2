import React from 'react';
import { connect } from 'react-redux';

import { rollDiceThunk } from '../../store/diceReducer';
import { DieType, DiceType } from '../../types';

const Die: React.FC<{ isOne: boolean }> = ({ isOne }) => (
  <div>{isOne ? '🞕' : '◻'}</div>
);

type DiceProps = {
  faces: DiceType;
  rollDiceThunk: () => void;
  canRoll: boolean;
};

const Dice: React.FC<DiceProps> = (props) => (
  <section>
    {props.faces.map((die, i) => (
      <Die key={i} isOne={die === 1 ? true : false} />
    ))}
    <button disabled={!props.canRoll} onClick={props.rollDiceThunk}>
      Roll
    </button>
  </section>
);

type StateProps = {
  dice: {
    faces: DiceType;
    canRoll: boolean;
  };
};

export default connect(
  (state: StateProps) => ({
    faces: state.dice.faces,
    canRoll: state.dice.canRoll,
  }),
  { rollDiceThunk }
)(Dice);

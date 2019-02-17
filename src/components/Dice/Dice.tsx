import React, { useState } from 'react';
import { connect } from 'react-redux';

import { rollDiceThunk } from '../../store/reducers/diceReducer';

const Die = ({ isOne }: { isOne: boolean }) => <div>{isOne ? '🞕' : '◻'}</div>;

type DiceProps = {
  faces: [number];
  rollDiceThunk: () => void;
};

const Dice = (props: DiceProps) => {
  // const [dice, setDice] = useState([0, 0, 0, 0]);
  return (
    <section>
      {props.faces.map((die, i) => (
        <Die key={i} isOne={die === 1 ? true : false} />
      ))}
      <button onClick={props.rollDiceThunk}>Roll</button>
    </section>
  );
};

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

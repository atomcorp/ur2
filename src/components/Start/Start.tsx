import React from 'react';
import { connect } from 'react-redux';

import { startGameThunk, endGame } from '../../store/gameReducer';

type StartProps = {
  hasStarted: boolean;
  startGameThunk: () => void;
  endGame: () => void;
  winner: string;
};

const Start = (props: StartProps) => (
  <div>
    <button
      onClick={
        props.hasStarted ? () => props.endGame() : () => props.startGameThunk()
      }
    >
      {props.hasStarted ? 'Cancel' : 'Start'}
    </button>
    {props.winner && `Winner is ${props.winner}`}
  </div>
);

type State = {
  game: {
    started: boolean;
    winner: string;
  };
};

export default connect(
  (state: State) => ({
    hasStarted: state.game.started,
    winner: state.game.winner,
  }),
  { startGameThunk, endGame }
)(Start);

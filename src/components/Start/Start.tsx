import React from 'react';
import { connect } from 'react-redux';

import { startGame, endGame } from '../../store/gameReducer';

type StartProps = {
  hasStarted: boolean;
  startGame: () => void;
  endGame: () => void;
};

const Start = (props: StartProps) => (
  <button
    onClick={props.hasStarted ? () => props.endGame() : () => props.startGame()}
  >
    {props.hasStarted ? 'Cancel' : 'Start'}
  </button>
);

type State = {
  game: {
    started: boolean;
  };
};

export default connect(
  (state: State) => ({
    hasStarted: state.game.started,
  }),
  { startGame, endGame }
)(Start);

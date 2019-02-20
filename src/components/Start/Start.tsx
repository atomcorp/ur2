import React from 'react';
import { connect } from 'react-redux';

import { startGameThunk, endGame } from '../../store/gameReducer';

type StartProps = {
  hasStarted: boolean;
  startGameThunk: () => void;
  endGame: () => void;
};

const Start = (props: StartProps) => (
  <button
    onClick={
      props.hasStarted ? () => props.endGame() : () => props.startGameThunk()
    }
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
  { startGameThunk, endGame }
)(Start);

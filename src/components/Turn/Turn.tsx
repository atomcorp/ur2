import React from 'react';
import { connect } from 'react-redux';

import { PLAYER } from '../../utilities/playerHelpers';
import { PlayerType } from '../../types';

type TurnType = {
  turn: PlayerType;
};

const Turn = (props: TurnType) => (
  <section>
    Turn: {props.turn === PLAYER.ONE ? 'Player one' : 'Player two'}
  </section>
);

type StateType = {
  game: {
    turn: PlayerType;
  };
};

export default connect(
  (state: StateType) => ({
    turn: state.game.turn,
  }),
  {}
)(Turn);

import { createReducer, createAction } from 'redux-starter-kit';

import { PLAYER, oppositePlayer } from '../utilities/playerHelpers';

export const startGame = createAction('START_GAME');
export const endGame = createAction('END_GAME');

export const toggleTurn = createAction('TOGGLE_TURN');
export const startTurn = createAction('START_TURN');
export const endTurn = createAction('END_TURN');

// const turnThunk = () => (dispatch, getState) => {};

export const startGameThunk = () => (dispatch, getState) => {
  dispatch(startGame());
  dispatch(startTurn());
};

const gameReducer = createReducer(
  {
    turn: PLAYER.ONE,
    started: false,
  },
  {
    [startGame]: (state) => {
      state.started = true;
    },
    [endGame]: (state) => {
      state.started = false;
    },
    [toggleTurn]: (state) => {
      state.turn = oppositePlayer(state.turn);
    },
  }
);

export default gameReducer;

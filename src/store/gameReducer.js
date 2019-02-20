import { createReducer, createAction } from 'redux-starter-kit';

import { PLAYER, oppositePlayer } from '../utilities/playerHelpers';

export const startGame = createAction('START_GAME');
export const endGame = createAction('END_GAME');

export const toggleTurn = createAction('TOGGLE_TURN');
export const startTurn = createAction('START_TURN');
export const endTurn = createAction('END_TURN');
export const setWinner = createAction('SET_WINNER');

// const turnThunk = () => (dispatch, getState) => {};

export const startGameThunk = () => (dispatch, getState) => {
  dispatch(startGame());
  dispatch(startTurn());
};

export const testEndGameThunk = () => (dispatch, getState) => {
  const state = getState();
  if (state[PLAYER.ONE].finishArea === 6) {
    dispatch(setWinner(PLAYER.ONE));
    dispatch(endGame());
  }
  if (state[PLAYER.TWO].finishArea === 6) {
    dispatch(setWinner(PLAYER.TWO));
    dispatch(endGame());
  }
};

const gameReducer = createReducer(
  {
    turn: PLAYER.ONE,
    started: false,
    winner: null,
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
    [setWinner]: (state, { payload }) => {
      state.winner = payload;
    },
  }
);

export default gameReducer;

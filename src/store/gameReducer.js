import { createReducer } from 'redux-starter-kit';
import { PLAYER, oppositePlayer } from '../utilities/playerHelpers';
import {
  startGame,
  endGame,
  toggleTurn,
  startTurn,
  setWinner,
} from './actions';

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

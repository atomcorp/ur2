import { createReducer } from 'redux-starter-kit';
import { startTurn, toggleTurn, rollDiceAction } from './actions';
import {
  togglePlayerCanMoveThunk,
  isNextTurnPossibleThunk,
} from './playerReducer';
import { rollDice } from '../utilities/diceHelpers';

export const rollDiceThunk = () => {
  return (dispatch, getState) => {
    const diceResults = rollDice();
    const diceResultsTotal = diceResults.reduce((acc, val) => val + acc);
    dispatch(
      rollDiceAction({
        faces: diceResults,
        count: diceResultsTotal,
      })
    );
    if (diceResultsTotal > 0) {
      dispatch(isNextTurnPossibleThunk());
      // current player can move
      dispatch(togglePlayerCanMoveThunk());
    } else {
      // toggle turn
      dispatch(toggleTurn());
    }
  };
};

const diceReducer = createReducer(
  {
    faces: [0, 0, 0, 0],
    count: 0,
    canRoll: false,
  },
  {
    [rollDiceAction]: (state, action) => {
      // state.faces = action.payload.faces;
      state.faces = [0, 0, 0, 0];
      // state.count = action.payload.count;
      state.count = 2;
      state.canRoll = false;
    },
    [startTurn]: (state) => {
      state.canRoll = true;
    },
    [toggleTurn]: (state) => {
      state.canRoll = true;
    },
  }
);

export default diceReducer;

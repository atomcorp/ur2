import { createReducer, createAction } from 'redux-starter-kit';
import { startTurn, toggleTurn } from './actions';
import { togglePlayerCanMoveThunk } from './playerReducer';
import { rollDice } from '../utilities/diceHelpers';

export const rollDiceAction = createAction('ROLL_DICE');

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
      state.faces = action.payload.faces;
      state.count = action.payload.count;
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

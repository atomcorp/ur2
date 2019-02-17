import { createReducer, createAction } from 'redux-starter-kit';
import { rollDice } from '../../utilities/diceHelpers';

export const rollDiceAction = createAction('ROLL_DICE');

export const rollDiceThunk = () => {
  return (dispatch, getState) => {
    const diceResults = rollDice();
    dispatch(
      rollDiceAction({
        faces: diceResults,
        count: diceResults.reduce((acc, val) => val + acc)
      })
    );
  };
};

const diceReducer = createReducer(
  {
    faces: [0, 0, 0, 0],
    count: 0
  },
  {
    [rollDiceAction.type]: (state, action) => {
      state.faces = action.payload.faces;
      state.count = action.payload.count;
    }
  }
);

export default diceReducer;

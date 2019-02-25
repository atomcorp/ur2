import { createAction } from 'redux-starter-kit';

export const moveToken = createAction('MOVE_TOKEN');
export const previewTokenMove = createAction('PREVIEW_TOKEN_MOVE');
export const endPreviewMove = createAction('END_MOVE_PREVIEW');
export const removePlayerOneStartToken = createAction(
  'REMOVE_PLAYER_ONE_START_TOKEN'
);
export const removePlayerTwoStartToken = createAction(
  'REMOVE_PLAYER_TWO_START_TOKEN'
);
export const addPlayerOneFinishToken = createAction(
  'ADD_PLAYER_ONE_FINISH_TOKEN'
);
export const addPlayerTwoFinishToken = createAction(
  'ADD_PLAYER_TWO_FINISH_TOKEN'
);
export const addPlayerOneStartToken = createAction(
  'ADD_START_PLAYER_ONE_TOKEN'
);
export const addPlayerTwoStartToken = createAction(
  'ADD_START_PLAYER_TWO_TOKEN'
);
export const togglePlayerOneCanMove = createAction(
  'TOGGLE_PLAYER_ONE_CAN_MOVE'
);
export const togglePlayerTwoCanMove = createAction(
  'TOGGLE_PLAYER_TWO_CAN_MOVE'
);
export const setError = createAction('SET_ERROR');
export const setStatus = createAction('SET_STATUS');
export const clearMessages = createAction('CLEAR_MESSAGES');
export const startGame = createAction('START_GAME');
export const endGame = createAction('END_GAME');
export const toggleTurn = createAction('TOGGLE_TURN');
export const startTurn = createAction('START_TURN');
export const endTurn = createAction('END_TURN');
export const setWinner = createAction('SET_WINNER');
export const rollDiceAction = createAction('ROLL_DICE');
export const isNextTurnPossible = createAction('IS_NEXT_TURN_OK');
// export const nextTurnImpossible = createAction('NEXT_TURN_IMPOSSIBLE');

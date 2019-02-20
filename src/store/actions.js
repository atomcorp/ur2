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

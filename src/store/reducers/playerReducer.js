import { createReducer, createAction } from 'redux-starter-kit';
import { PLAYER, generatePlayerPieces } from '../../utilities/playerHelpers';

// const previewTokenMove = createAction('PREVIEW_TOKEN_MOVE');
// previewTokenMove({
//   token,
//   currentPosition,
//   moves
// });
// const moveToken = createAction('MOVE_TOKEN');
// moveToken({
//   token,
//   currentPosition,
//   nextPosition,
// })

const createDefaultPlayerState = (player) => ({
  startArea: generatePlayerPieces(player),
  finishArea: [],
  isTurn: player === PLAYER.ONE ? true : false
});

const playerReducer = {};

export const playerOneReducer = createReducer(
  createDefaultPlayerState(PLAYER.ONE),
  playerReducer
);

export const playerTwoReducer = createReducer(
  createDefaultPlayerState(PLAYER.TWO),
  playerReducer
);

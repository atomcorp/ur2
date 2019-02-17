import { createReducer } from 'redux-starter-kit';
import { PLAYER, generatePlayerPieces } from '../../utilities/playerHelpers';

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

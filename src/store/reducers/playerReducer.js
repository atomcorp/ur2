import { createReducer, createAction } from 'redux-starter-kit';
import {
  PLAYER,
  generatePlayerPieces,
  POSITION_MAP
} from '../../utilities/playerHelpers';

export const previewTokenMoveAction = createAction('PREVIEW_TOKEN_MOVE');
export const endPreviewMove = createAction('END_MOVE_PREVIEW');

export const previewStartTokenMoveThunk = ({ player, position }) => {
  return (dispatch, getState) => {
    const state = getState();
    if (state[player].startArea.length < 1) {
      return;
    }
    const playersPositions = POSITION_MAP[player];
    const position = playersPositions[0 + state.dice.count];
    dispatch(
      previewTokenMoveAction({
        position,
        player
      })
    );
  };
};
// previewTokenMove({
//   token,
//   position,
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

const playerReducer = {
  // [previewTokenMove]: (state, action) => {
  //   console.log();
  // }
};

export const playerOneReducer = createReducer(
  createDefaultPlayerState(PLAYER.ONE),
  playerReducer
);

export const playerTwoReducer = createReducer(
  createDefaultPlayerState(PLAYER.TWO),
  playerReducer
);

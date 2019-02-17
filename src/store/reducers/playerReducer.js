import { createReducer, createAction } from 'redux-starter-kit';
import {
  PLAYER,
  generatePlayerPieces,
  POSITION_MAP
} from '../../utilities/playerHelpers';
import { setError } from './messageReducer';

// ACTIONS
export const moveToken = createAction('MOVE_TOKEN');
export const previewTokenMoveAction = createAction('PREVIEW_TOKEN_MOVE');
export const endPreviewMove = createAction('END_MOVE_PREVIEW');
const removePlayerOneStartToken = createAction('REMOVE_PLAYER_ONE_START_TOKEN');
const removePlayerTwoStartToken = createAction('REMOVE_PLAYER_TWO_START_TOKEN');

// THUNKS
const getPlayerIndex = (playersPositions, position) =>
  playersPositions.findIndex((square) => position === square);

export const previewTokenMoveThunk = ({ player, position }) => {
  return (dispatch, getState) => {
    const state = getState();
    if (state[player].startArea.length < 1) {
      return;
    }
    const playersPositions = POSITION_MAP[player];
    console.log(playersPositions);
    const nextPosition =
      playersPositions[
        getPlayerIndex(playersPositions, position) + state.dice.count
      ];
    dispatch(
      previewTokenMoveAction({
        position: nextPosition,
        player
      })
    );
  };
};

export const moveTokenThunk = ({ player, position, token }) => {
  return (dispatch, getState) => {
    const state = getState();
    const playersPositions = POSITION_MAP[player];
    const nextPosition =
      playersPositions[
        playersPositions.findIndex((square) => position === square) +
          state.dice.count
      ];
    if (position === 'start') {
      if (state[player].startArea.length > 0) {
        token = state[player].startArea[0];
        dispatch(moveToken({ nextPosition, token, position }));
        // remove from players start stack
        dispatch(
          player === PLAYER.ONE
            ? removePlayerOneStartToken()
            : removePlayerTwoStartToken()
        );
      } else {
        // dispatch error, no tiles left
        dispatch(setError('No tokens left'));
      }
    }
  };
};

// const moveTokenFromStartThunk = ({ player,token }) => {
//   return (dispatch, getState) => {
//     const state = getState();
//     if (state[player].startArea.length > 0) {
//       // send token to board position

//     }
//   };
// };

const createDefaultPlayerState = (player) => ({
  startArea: generatePlayerPieces(player),
  finishArea: [],
  isTurn: player === PLAYER.ONE ? true : false
});

const getPlayerStartToken = (state, { payload }) => {
  state.startArea.shift();
};

export const playerOneReducer = createReducer(
  createDefaultPlayerState(PLAYER.ONE),
  {
    [removePlayerOneStartToken]: getPlayerStartToken
  }
);

export const playerTwoReducer = createReducer(
  createDefaultPlayerState(PLAYER.TWO),
  {
    [removePlayerTwoStartToken]: getPlayerStartToken
  }
);

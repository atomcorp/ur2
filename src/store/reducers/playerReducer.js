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

const moveStartToken = ({ startArea, dispatch, nextPosition, player }) => {
  if (startArea.length > 0) {
    const token = startArea[0];
    dispatch(
      moveToken({
        nextPosition: nextPosition,
        token,
        position: 'start'
      })
    );
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
};

const isNextMoveInvalid = ({ nextPosition, dispatch, state }) => {
  if (nextPosition == null) {
    dispatch(setError('No tokens left'));
    return false;
  }
  if (state.board.positions[nextPosition]) {
  }
};

export const moveTokenThunk = ({ player, position, token }) => {
  return (dispatch, getState) => {
    const state = getState();
    const playersPositions = POSITION_MAP[player];
    const nextPosition =
      playersPositions[
        getPlayerIndex(playersPositions, position) + state.dice.count
      ];
    if (isNextMoveInvalid({ nextPosition, dispatch, state })) {
    }
    if (position === 'start') {
      moveStartToken({
        dispatch,
        player,
        nextPosition,
        startArea: state[player].startArea
      });
      return;
    }
    dispatch(moveToken({ nextPosition, token, position }));
  };
};

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

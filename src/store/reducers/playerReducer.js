import { createReducer, createAction } from 'redux-starter-kit';
import { PLAYER, POSITION_MAP } from '../../utilities/playerHelpers';
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
    if (state[player].startArea < 1) {
      return;
    }
    const playersPositions = POSITION_MAP[player];
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
  if (startArea > 0) {
    dispatch(
      moveToken({
        nextPosition: nextPosition,
        token: player,
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
  startArea: 6,
  finishArea: 0,
  isTurn: player === PLAYER.ONE ? true : false
});

const removePlayerStartToken = (state, { payload }) => {
  state.startArea -= 1;
};

export const playerOneReducer = createReducer(
  createDefaultPlayerState(PLAYER.ONE),
  {
    [removePlayerOneStartToken]: removePlayerStartToken
  }
);

export const playerTwoReducer = createReducer(
  createDefaultPlayerState(PLAYER.TWO),
  {
    [removePlayerTwoStartToken]: removePlayerStartToken
  }
);

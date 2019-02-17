import { createReducer, createAction } from 'redux-starter-kit';
import { PLAYER, POSITION_MAP } from '../../utilities/playerHelpers';
import { setError } from './messageReducer';

// ACTIONS
export const moveToken = createAction('MOVE_TOKEN');
export const previewTokenMoveAction = createAction('PREVIEW_TOKEN_MOVE');
export const endPreviewMove = createAction('END_MOVE_PREVIEW');
const removePlayerOneStartToken = createAction('REMOVE_PLAYER_ONE_START_TOKEN');
const removePlayerTwoStartToken = createAction('REMOVE_PLAYER_TWO_START_TOKEN');
const addPlayerOneFinishToken = createAction('ADD_PLAYER_ONE_FINISH_TOKEN');
const addPlayerTwoFinishToken = createAction('ADD_PLAYER_TWO_FINISH_TOKEN');

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

const moveTokenFromStart = ({ startArea, dispatch, nextPosition, player }) => {
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

const moveTokenToFinish = ({ player, dispatch, position }) => {
  dispatch(
    moveToken({
      position,
      token: player
    })
  );
  // add to players finish stack
  dispatch(
    player === PLAYER.ONE
      ? addPlayerOneFinishToken()
      : addPlayerTwoFinishToken()
  );
};

const isNextMoveInvalid = ({ nextPosition, dispatch, state, player }) => {
  if (state.dice.count < 1) {
    dispatch(setError('You must roll over 1'));
    return true;
  }
  if (nextPosition == null) {
    dispatch(setError('You need to roll exactly to leave'));
    return true;
  }
  if (
    nextPosition in state.board.positions &&
    state.board.positions[nextPosition] === player
  ) {
    dispatch(setError('You can\'t move move to a square you already occupy'));
    return true;
    // if a tile of yours  already in position
  }
  return false;
};

export const moveTokenThunk = ({ player, position, token }) => {
  return (dispatch, getState) => {
    const state = getState();
    const playersPositions = POSITION_MAP[player];
    const nextPosition =
      playersPositions[
        getPlayerIndex(playersPositions, position) + state.dice.count
      ];
    if (isNextMoveInvalid({ nextPosition, dispatch, state, player })) {
      return;
    }
    // if chosen from the start group
    if (position === 'start') {
      moveTokenFromStart({
        dispatch,
        player,
        nextPosition,
        startArea: state[player].startArea
      });
      return;
    }
    if (nextPosition === 'finish') {
      moveTokenToFinish({ dispatch, player, position });
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

const addPlayerFinishToken = (state, { payload }) => {
  state.finishArea += 1;
};

export const playerOneReducer = createReducer(
  createDefaultPlayerState(PLAYER.ONE),
  {
    [removePlayerOneStartToken]: removePlayerStartToken,
    [addPlayerOneFinishToken]: addPlayerFinishToken
  }
);

export const playerTwoReducer = createReducer(
  createDefaultPlayerState(PLAYER.TWO),
  {
    [removePlayerTwoStartToken]: removePlayerStartToken,
    [addPlayerTwoFinishToken]: addPlayerFinishToken
  }
);

import { createReducer, createAction } from 'redux-starter-kit';
import {
  PLAYER,
  POSITION_MAP,
  oppositePlayer,
} from '../../utilities/playerHelpers';
import {
  moveTokenFromStart,
  moveTokenToFinish,
  isNextMoveInvalid,
  moveOppositionTokenBackToStart,
} from '../../utilities/moveHelpers';

// ACTIONS
export const moveToken = createAction('MOVE_TOKEN');
export const previewTokenMoveAction = createAction('PREVIEW_TOKEN_MOVE');
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
        player,
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
        startArea: state[player].startArea,
      });
      return;
    }
    if (nextPosition === 'finish') {
      moveTokenToFinish({ dispatch, player, position });
      return;
    }
    // if move to same space as opponent
    if (
      nextPosition in state.board.positions &&
      state.board.positions[nextPosition] === oppositePlayer(player)
    ) {
      moveOppositionTokenBackToStart({ player, dispatch });
    }
    dispatch(moveToken({ nextPosition, token, position }));
  };
};

const createDefaultPlayerState = (player) => ({
  startArea: 6,
  finishArea: 0,
  isTurn: player === PLAYER.ONE ? true : false,
});

const removePlayerStartToken = (state, { payload }) => {
  state.startArea -= 1;
};

const addPlayerFinishToken = (state, { payload }) => {
  state.finishArea += 1;
};

const addPlayerStartToken = (state, { payload }) => {
  state.startArea += 1;
};

export const playerOneReducer = createReducer(
  createDefaultPlayerState(PLAYER.ONE),
  {
    [removePlayerOneStartToken]: removePlayerStartToken,
    [addPlayerOneFinishToken]: addPlayerFinishToken,
    [addPlayerOneStartToken]: addPlayerStartToken,
  }
);

export const playerTwoReducer = createReducer(
  createDefaultPlayerState(PLAYER.TWO),
  {
    [removePlayerTwoStartToken]: removePlayerStartToken,
    [addPlayerTwoFinishToken]: addPlayerFinishToken,
    [addPlayerTwoStartToken]: addPlayerStartToken,
  }
);

import { createReducer } from 'redux-starter-kit';
import {
  moveToken,
  previewTokenMove,
  removePlayerOneStartToken,
  removePlayerTwoStartToken,
  addPlayerOneFinishToken,
  addPlayerTwoFinishToken,
  addPlayerOneStartToken,
  addPlayerTwoStartToken,
  togglePlayerOneCanMove,
  togglePlayerTwoCanMove,
} from './actions';
import {
  PLAYER,
  POSITION_MAP,
  oppositePlayer,
  positionIsSpecialSquare,
} from '../utilities/playerHelpers';
import {
  isNextMoveInvalid,
  returnCurrentPlayersFinishTokens,
} from '../utilities/moveHelpers';
import { startTurn, toggleTurn, testEndGameThunk } from './gameReducer';

// THUNKS
const getPlayerIndex = (playersPositions, position) =>
  playersPositions.findIndex((square) => position === square);

export const previewTokenMoveThunk = ({ player, position }) => {
  return (dispatch, getState) => {
    const state = getState();

    const playersPositions = POSITION_MAP[player];
    const nextPosition =
      playersPositions[
        getPlayerIndex(playersPositions, position) + state.dice.count
      ];
    dispatch(
      previewTokenMove({
        position: nextPosition,
        player,
      })
    );
  };
};

export const moveTokenThunk = ({ player, position, token }) => {
  return (dispatch, getState) => {
    const state = getState();
    const nextPosition =
      POSITION_MAP[player][
        getPlayerIndex(POSITION_MAP[player], position) + state.dice.count
      ];
    const currentPlayer = getState().game.turn;
    // if move invalid, cancel
    if (isNextMoveInvalid({ nextPosition, dispatch, state, player })) {
      return;
    }
    // if chosen from the start group
    if (position === 'start') {
      dispatch(removePlayerStartTokenThunk());
    }
    if (nextPosition === 'finish') {
      dispatch(addPlayerFinishTokenThunk());
      if (returnCurrentPlayersFinishTokens(getState()) === 6) {
        dispatch(testEndGameThunk());
      }
    }
    // if opponent token in same position, move to start
    if (state.board.positions[nextPosition] === oppositePlayer(player)) {
      dispatch(addPlayerStartTokenThunk());
    }
    // move turn and disable current player
    dispatch(moveToken({ nextPosition, token: currentPlayer, position }));
    dispatch(togglePlayerCanMoveThunk());
    // if special square, get another turn
    if (positionIsSpecialSquare(nextPosition)) {
      // restart turn
      dispatch(startTurn());
    } else {
      dispatch(toggleTurn());
    }
  };
};

const removePlayerStartTokenThunk = () => (dispatch, getState) => {
  const currentPlayer = getState().game.turn;
  if (currentPlayer === PLAYER.ONE) {
    dispatch(removePlayerOneStartToken());
  } else {
    dispatch(removePlayerTwoStartToken());
  }
};

const addPlayerStartTokenThunk = () => (dispatch, getState) => {
  const currentPlayer = getState().game.turn;
  if (currentPlayer === PLAYER.ONE) {
    dispatch(addPlayerTwoStartToken());
  } else {
    dispatch(addPlayerOneStartToken());
  }
};

const addPlayerFinishTokenThunk = () => (dispatch, getState) => {
  const currentPlayer = getState().game.turn;
  if (currentPlayer === PLAYER.ONE) {
    dispatch(addPlayerOneFinishToken());
  } else {
    dispatch(addPlayerTwoFinishToken());
  }
};

export const togglePlayerCanMoveThunk = () => (dispatch, getState) => {
  const currentPlayer = getState().game.turn;
  if (currentPlayer === PLAYER.ONE) {
    dispatch(togglePlayerOneCanMove());
  } else {
    dispatch(togglePlayerTwoCanMove());
  }
};

// REDUCERS

const createDefaultPlayerState = (player) => ({
  startArea: 6,
  finishArea: 0,
  canMove: false,
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

const toggleCanMove = (state, { payload }) => {
  state.canMove = !state.canMove;
};

export const playerOneReducer = createReducer(
  createDefaultPlayerState(PLAYER.ONE),
  {
    [removePlayerOneStartToken]: removePlayerStartToken,
    [addPlayerOneFinishToken]: addPlayerFinishToken,
    [addPlayerOneStartToken]: addPlayerStartToken,
    [togglePlayerOneCanMove]: toggleCanMove,
  }
);

export const playerTwoReducer = createReducer(
  createDefaultPlayerState(PLAYER.TWO),
  {
    [removePlayerTwoStartToken]: removePlayerStartToken,
    [addPlayerTwoFinishToken]: addPlayerFinishToken,
    [addPlayerTwoStartToken]: addPlayerStartToken,
    [togglePlayerTwoCanMove]: toggleCanMove,
  }
);

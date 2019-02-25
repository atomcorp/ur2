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
  startTurn,
  toggleTurn,
  setError,
} from './actions';
import {
  PLAYER,
  oppositePlayer,
  positionIsSpecialSquare,
} from '../utilities/playerHelpers';
import {
  isNextMoveInvalid,
  returnCurrentPlayersFinishTokens,
  getNextPosition,
  isNextPositionPossibleThunk,
} from '../utilities/moveHelpers';
import { testEndGameThunk } from './gameReducer';

export const isNextTurnPossibleThunk = () => (dispatch, getState) => {
  const state = getState();
  const currentPlayer = getState().game.turn;
  let playersActivePositions = [];
  // is start move possible
  if (state[currentPlayer].startArea > 0) {
    playersActivePositions.push('start');
  }
  playersActivePositions = playersActivePositions.concat(
    Object.keys(state.board.positions).filter(
      (position) => state.board.positions[position] === currentPlayer
    )
  );
  const isAnyMovePossible = playersActivePositions.every((position) =>
    isNextPositionPossibleThunk({
      position,
    })
  );
  if (playersActivePositions.length > 0 && isAnyMovePossible) {
    dispatch(setError('No move possible'));
    dispatch(toggleTurn());
  }
};

export const previewTokenMoveThunk = ({ player, position }) => {
  return (dispatch, getState) => {
    const state = getState();

    const nextPosition = getNextPosition({
      player,
      position,
      moves: state.dice.count,
    });

    dispatch(
      previewTokenMove({
        position: nextPosition,
        player,
      })
    );
  };
};

export const moveTokenThunk = ({ position }) => {
  return (dispatch, getState) => {
    const state = getState();
    const currentPlayer = getState().game.turn;
    const nextPosition = getNextPosition({
      player: currentPlayer,
      position,
      moves: state.dice.count,
    });
    // if move invalid, cancel
    if (
      isNextMoveInvalid({
        nextPosition,
        dispatch,
        state,
        player: currentPlayer,
      })
    ) {
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
    if (state.board.positions[nextPosition] === oppositePlayer(currentPlayer)) {
      dispatch(addPlayerStartTokenThunk());
    }
    // move turn and disable current player
    dispatch(moveToken({ nextPosition, player: currentPlayer, position }));
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

// REDUCER
const createDefaultPlayerState = (player) => ({
  startArea: 0,
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

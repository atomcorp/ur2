import { setError } from '../store/actions';

import {
  oppositePlayer,
  positionIsSpecialSquare,
  POSITION_MAP,
} from './playerHelpers';

export const isNextPositionPossibleThunk = ({ position }) => (
  dispatch,
  getState
) => {
  const state = getState();
  const player = getState().game.turn;
  const moves = state.dice.count;
  const nextPosition = getNextPosition({ player, position, moves });
  // if a token of yours is already in nextPosition
  if (
    nextPosition in state.board.positions &&
    state.board.positions[nextPosition] === player
  ) {
    console.log('if a token of yours is already in nextPosition');
    return false;
  }
  // if token is opposition, but a special square
  if (
    nextPosition in state.board.positions &&
    oppositePlayer(state.board.positions[nextPosition]) &&
    positionIsSpecialSquare(nextPosition)
  ) {
    console.log('if token is opposition, but a special square');
    return false;
  }
  // roll more than finish
  if (nextPosition == null) {
    console.log('roll more than finish');
    return false;
  }
  return true;
};

export const isNextMoveInvalid = ({
  nextPosition,
  dispatch,
  state,
  player,
}) => {
  if (state.dice.count < 1) {
    dispatch(setError('You must roll over 1'));
    return true;
  }
  if (nextPosition == null) {
    dispatch(setError('You need an exact roll to leave'));
    return true;
  }
  // if a token of yours is already in nextPosition
  if (
    nextPosition in state.board.positions &&
    state.board.positions[nextPosition] === player
  ) {
    dispatch(setError('You can\'t move move to a square you already occupy'));
    return true;
  }
  // if token is opposition, but a special square
  if (
    nextPosition in state.board.positions &&
    oppositePlayer(state.board.positions[nextPosition]) &&
    positionIsSpecialSquare(nextPosition)
  ) {
    dispatch(setError('You can\'t move move to an occupied special square'));
    return true;
  }
  return false;
};

export const returnCurrentPlayersFinishTokens = (state) => {
  const currentPlayer = state.game.turn;
  return state[currentPlayer].finishArea;
};

export const getPlayerIndex = (playersPositions, position) =>
  playersPositions.findIndex((square) => position === square);

export const getNextPosition = ({ player, position, moves }) => {
  const playersPositions = POSITION_MAP[player];
  const nextPosition =
    playersPositions[getPlayerIndex(playersPositions, position) + moves];
  return nextPosition;
};

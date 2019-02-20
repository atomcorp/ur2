import { setError } from '../store/messageReducer';
import { oppositePlayer, positionIsSpecialSquare } from './playerHelpers';

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
    dispatch(setError('You need to roll exactly to leave'));
    return true;
  }
  // if a tile of yours is already in nextPosition
  if (
    nextPosition in state.board.positions &&
    state.board.positions[nextPosition] === player
  ) {
    dispatch(setError('You can\'t move move to a square you already occupy'));
    return true;
  }
  // if tile is opposition, but a special square
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

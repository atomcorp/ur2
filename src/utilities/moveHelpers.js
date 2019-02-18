import { setError } from '../store/reducers/messageReducer';
import {
  moveToken,
  addPlayerOneFinishToken,
  addPlayerTwoFinishToken,
  removePlayerOneStartToken,
  removePlayerTwoStartToken,
  addPlayerOneStartToken,
  addPlayerTwoStartToken,
} from '../store/reducers/playerReducer';
import {
  PLAYER,
  positionIsSpecialSquare,
  oppositePlayer,
} from './playerHelpers';

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

export const moveTokenToFinish = ({ player, dispatch, position }) => {
  dispatch(
    moveToken({
      position,
      token: player,
    })
  );
  // add to players finish stack
  dispatch(
    player === PLAYER.ONE
      ? addPlayerOneFinishToken()
      : addPlayerTwoFinishToken()
  );
};

export const moveTokenFromStart = ({
  startArea,
  dispatch,
  nextPosition,
  player,
}) => {
  if (startArea > 0) {
    dispatch(
      moveToken({
        nextPosition: nextPosition,
        token: player,
        position: 'start',
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

export const moveOppositionTokenBackToStart = ({ player, dispatch }) =>
  player === PLAYER.ONE
    ? dispatch(addPlayerTwoStartToken())
    : dispatch(addPlayerOneStartToken());

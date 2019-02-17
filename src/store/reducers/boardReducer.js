import { createReducer } from 'redux-starter-kit';
import { PLAYER, getPlayerPiece } from '../../utilities/playerHelpers';

const boardReducer = createReducer(
  {
    positions: {
      c3: getPlayerPiece(PLAYER.ONE, 4)
    }
  },
  {}
);

export default boardReducer;

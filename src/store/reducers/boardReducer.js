import { createReducer } from 'redux-starter-kit';
import { PLAYER } from '../../utilities/playerHelpers';

const boardReducer = createReducer(
  {
    positions: {
      c3: { player: PLAYER.ONE, piece: 2 },
      b4: { player: PLAYER.TWO, piece: 0 }
    }
  },
  {}
);

export default boardReducer;

import { createReducer } from 'redux-starter-kit';
// import { PLAYER } from '../../utilities/playerHelpers';
import { previewTokenMoveAction, endPreviewMove } from './playerReducer';
const boardReducer = createReducer(
  {
    positions: {
      // c3: { player: PLAYER.ONE, piece: 2 },
      // b4: { player: PLAYER.TWO, piece: 0 }
    },
    previewPosition: {}
  },
  {
    [previewTokenMoveAction]: (state, { payload }) => {
      state.previewPosition = { [payload.position]: payload.player };
    },
    [endPreviewMove]: (state) => {
      state.previewPosition = {};
    }
  }
);

export default boardReducer;

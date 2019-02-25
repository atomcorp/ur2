import { createReducer } from 'redux-starter-kit';
import { previewTokenMove, endPreviewMove, moveToken } from './actions';

const boardReducer = createReducer(
  {
    positions: {
      b7: 'PLAYER_ONE',
      c6: 'PLAYER_ONE',
    },
    previewPosition: {},
  },
  {
    [previewTokenMove]: (state, { payload }) => {
      state.previewPosition = { [payload.position]: payload.player };
    },
    [endPreviewMove]: (state) => {
      state.previewPosition = {};
    },
    [moveToken]: (state, { payload }) => {
      // nextPosition, token, position
      delete state.positions[payload.position];
      if (payload.nextPosition && payload.nextPosition !== 'finish') {
        state.positions[payload.nextPosition] = payload.player;
      }
      state.previewPosition = {};
    },
  }
);

export default boardReducer;

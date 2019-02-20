import { createReducer } from 'redux-starter-kit';

import { previewTokenMove, endPreviewMove, moveToken } from './actions';

// import { PLAYER } from '../utilities/playerHelpers';

const boardReducer = createReducer(
  {
    positions: {
      // c7: PLAYER.ONE,
      // a7: PLAYER.TWO,
      // b6: PLAYER.ONE,
      // b4: PLAYER.TWO,
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
        state.positions[payload.nextPosition] = payload.token;
      }
      state.previewPosition = {};
    },
  }
);

export default boardReducer;

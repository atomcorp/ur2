import { createReducer } from 'redux-starter-kit';
import { setError, setStatus, clearMessages } from './actions';

const messageReducer = createReducer(
  {
    error: '',
    status: '',
  },
  {
    [setError]: (state, { payload }) => {
      state.error = payload;
    },
    [setStatus]: (state, { payload }) => {
      state.status = payload;
    },
    [clearMessages]: (state) => {
      state.error = '';
      state.status = '';
    },
  }
);

export default messageReducer;

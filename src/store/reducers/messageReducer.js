import { createAction, createReducer } from 'redux-starter-kit';

export const setError = createAction('SET_ERROR');
export const setStatus = createAction('SET_STATUS');
export const clearMessages = createAction('CLEAR_MESSAGES');

const messageReducer = createReducer(
  {
    error: '',
    status: ''
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
    }
  }
);

export default messageReducer;

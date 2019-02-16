import { configureStore } from 'redux-starter-kit';
import { positionReducer } from './reducers';

const store = configureStore({
  reducer: { positionReducer }
});

export default store;

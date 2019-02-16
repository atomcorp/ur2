import { configureStore } from 'redux-starter-kit';
import { boardReducer } from './reducers';

const store = configureStore({
  reducer: { board: boardReducer }
});

export default store;

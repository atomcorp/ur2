import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import logger from 'redux-logger';
import {
  boardReducer,
  diceReducer,
  playerOneReducer,
  playerTwoReducer
} from './reducers';
import { PLAYER } from '../utilities/playerHelpers';

const store = configureStore({
  reducer: {
    board: boardReducer,
    dice: diceReducer,
    [PLAYER.ONE]: playerOneReducer,
    [PLAYER.TWO]: playerTwoReducer
  },
  middleware: [...getDefaultMiddleware(), logger]
});

export default store;

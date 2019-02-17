import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import logger from 'redux-logger';
import {
  boardReducer,
  diceReducer,
  playerOneReducer,
  playerTwoReducer,
  messageReducer
} from './reducers';
import { PLAYER } from '../utilities/playerHelpers';

const store = configureStore({
  reducer: {
    board: boardReducer,
    dice: diceReducer,
    [PLAYER.ONE]: playerOneReducer,
    [PLAYER.TWO]: playerTwoReducer,
    message: messageReducer
  },
  middleware: [...getDefaultMiddleware(), logger]
});

export default store;

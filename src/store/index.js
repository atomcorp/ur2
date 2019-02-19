import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import logger from 'redux-logger';
import boardReducer from './boardReducer';
import diceReducer from './diceReducer';
import { playerOneReducer, playerTwoReducer } from './playerReducer';
import messageReducer from './messageReducer';
import gameReducer from './gameReducer';
import { PLAYER } from '../utilities/playerHelpers';

const store = configureStore({
  reducer: {
    board: boardReducer,
    dice: diceReducer,
    [PLAYER.ONE]: playerOneReducer,
    [PLAYER.TWO]: playerTwoReducer,
    message: messageReducer,
    game: gameReducer,
  },
  middleware: [...getDefaultMiddleware(), logger],
});

export default store;

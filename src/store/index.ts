import { configureStore } from 'redux-starter-kit';
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
  }
});

export default store;

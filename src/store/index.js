import { configureStore } from 'redux-starter-kit';
import {
  boardReducer,
  diceReducer,
  playerOneReducer,
  playerTwoReducer
} from './reducers';

const store = configureStore({
  reducer: {
    board: boardReducer,
    dice: diceReducer,
    playerOne: playerOneReducer,
    playerTwo: playerTwoReducer
  }
});

export default store;

import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

import { Ur, Dice, Area } from './components/';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Ur />
          <Dice />
          <div style={{ display: 'flex' }}>
            <Area
              title="Player one start"
              player="playerOne"
              type="startArea"
            />
            <Area
              title="Player two start"
              player="playerTwo"
              type="startArea"
            />
            <Area
              title="Player one finish"
              player="playerOne"
              type="finishArea"
            />
            <Area
              title="Player one finish"
              player="playerTwo"
              type="finishArea"
            />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;

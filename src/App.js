import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

import { UrBoard, Dice, Area } from './components/';
import { PLAYER } from './utilities/playerHelpers';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <UrBoard />
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

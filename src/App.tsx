import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

import { Ur, Dice, Areas } from './components/';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Ur />
          <Dice />
          <Areas />
        </div>
      </Provider>
    );
  }
}

export default App;

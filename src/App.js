import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

import { UrBoard, Dice } from './components/';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <UrBoard />
          <Dice />
        </div>
      </Provider>
    );
  }
}

export default App;

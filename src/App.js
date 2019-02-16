import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

import { UrBoard } from './components/';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <UrBoard />
      </Provider>
    );
  }
}

export default App;

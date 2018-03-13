import React from 'react';
import { Provider } from 'react-redux';

import { ApplicationContainerWrapper } from './js/application.container';
import store from './js/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ApplicationContainerWrapper/>
      </Provider>
    );
  }
}

// External Imports

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

// Local Imports
import App from './App';

// Assets
import './index.css';
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

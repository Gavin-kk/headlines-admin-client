import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import moment from 'moment';
import App from './App';
import store from './store';
import { momentConfig } from './config/moment.config';

moment.locale('zh-cn', momentConfig);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import { ConfigProvider } from 'antd';
import App from './App';
import store from './store';
import { momentConfig } from './config/moment.config';

moment.locale('zh-cn', momentConfig);

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root'),
);

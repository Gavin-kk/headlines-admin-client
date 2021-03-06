import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './root.reducer';
import sagaArr from './root.saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware, thunk)));

sagaArr.forEach((item) => {
  sagaMiddleware.run(item);
});

export default store;

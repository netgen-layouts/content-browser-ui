import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers';

export default function configureStore() {
  const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger));
  return store;
}

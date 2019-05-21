import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers';

let middleware = [thunkMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware];
  if (!window.Cypress) middleware.push(logger);
}
export default function configureStore() {
  const store = createStore(reducer, applyMiddleware(...middleware));
  if (window.Cypress) {
    window.store = store
  }
  return store;
}

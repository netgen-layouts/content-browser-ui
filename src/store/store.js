import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';

let middleware = [thunkMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware];
}
export default function configureStore() {
  const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));
  if (window.Cypress) {
    window.store = store
  }
  return store;
}

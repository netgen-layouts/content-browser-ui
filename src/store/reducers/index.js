import { combineReducers } from 'redux';
import app from './app';
import items from './items';
import search from './search';

export default combineReducers({
  app,
  items,
  search,
});

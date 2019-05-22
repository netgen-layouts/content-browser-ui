import React from 'react';
import Browser from './containers/Browser';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './store/store';
import { initialSetup } from './store/actions/app';

function App({ overrides = {}, onCancel, onConfirm, itemType, disabledItems = [] }) {
  const reduxStore = configureStore();
  reduxStore.dispatch(initialSetup({
    itemType,
    onCancel,
    onConfirm,
    config: overrides,
    disabledItems,
    itemsLimit: localStorage.getItem('cb_itemsLimit') || 10,
    showPreview: localStorage.getItem('cb_showPreview') ? JSON.parse(localStorage.getItem('cb_showPreview')) : false,
  }))

  return (
    <ReduxProvider store={reduxStore}>
      <Browser/>
    </ReduxProvider>
  );
}

export default App;

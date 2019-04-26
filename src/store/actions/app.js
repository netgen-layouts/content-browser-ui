import fetch from 'cross-fetch';
import { saveSectionId, setLocationId, fetchTreeItems, setPage, fetchPreview } from './items';
import {
  INITIAL_SETUP,
  CONFIG_LOADED,
  TOGGLE_COLUMN,
  FETCH_CONFIG,
  SET_SELECTED_ITEM,
  SET_ITEMS_LIMIT,
  TOGGLE_PREVIEW,
} from '../actionTypes';

const cbBasePath = document.querySelector('meta[name=ngcb-base-path]').getAttribute('content');
const cbBaseApiPath = '/api/v1/';

const cbApiUrl = (rootPath, path) => {
  return `${cbBasePath}${cbBaseApiPath}${rootPath}/${path}`.replace(/\/{2,}/g, '/');
}

export const initialSetup = (data) => {
  return {
    type: INITIAL_SETUP,
    data,
  };
};

const configLoaded = () => {
  return {
    type: CONFIG_LOADED
  };
};

const receivePosts = (config) => {
  return {
    type: FETCH_CONFIG,
    config,
  }
};

export const toggleColumn = (id, toggle) => {
  return {
    type: TOGGLE_COLUMN,
    id,
    toggle,
  };
};

export const fetchConfig = () => {
  return (dispatch, getState) => {
    return fetch(cbApiUrl(getState().app.rootPath, 'config'))
      .then(res => res.json())
      .then(
        (config) => {
          if (!getState().items.sectionId) dispatch(saveSectionId(config.sections[0].id));
          dispatch(setLocationId(getState().items.sectionId));
          dispatch(receivePosts(config));
          dispatch(fetchTreeItems());
          dispatch(configLoaded());
        },
      )
    }
};

export const setSelectedItem = (item, selected) => {
  return {
    type: SET_SELECTED_ITEM,
    item,
    selected,
  }
};

const saveItemsLimit = (limit) => {
  return {
    type: SET_ITEMS_LIMIT,
    limit,
  };
};

export const setItemsLimit = (limit) => {
  return dispatch => {
    dispatch(saveItemsLimit(limit));
    dispatch(setPage(1));
  }
};

export const togglePreview = (toggle) => {
  return dispatch => {
    dispatch({
      type: TOGGLE_PREVIEW,
      toggle,
    });
    if (toggle) dispatch(fetchPreview());
  }
};

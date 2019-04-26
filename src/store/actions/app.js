import fetch from 'cross-fetch';
import { saveSectionId, setLocationId, fetchTreeItems, setPage } from './items';
import { setSearchPage } from './search';
import {
  INITIAL_SETUP,
  CONFIG_LOADED,
  TOGGLE_COLUMN,
  FETCH_CONFIG,
  SET_SELECTED_ITEM,
  SET_ITEMS_LIMIT,
  TOGGLE_PREVIEW,
  START_PREVIEW_LOAD,
  STOP_PREVIEW_LOAD,
  FETCH_PREVIEW,
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
    dispatch(setSearchPage(1));
  }
};

export const togglePreview = (toggle) => {
  return dispatch => {
    dispatch({
      type: TOGGLE_PREVIEW,
      toggle,
    });
  }
};

const startPreviewLoad = () => {
  return {
    type: START_PREVIEW_LOAD
  };
};

const stopPreviewLoad = () => {
  return {
    type: STOP_PREVIEW_LOAD
  };
};

const storePreview = (preview) => {
  return {
    type: FETCH_PREVIEW,
    preview,
  }
};

export const fetchPreview = (item) => {
  return (dispatch, getState) => {
    if (!getState().app.showPreview || getState().app.previews[item] || item === null) return;
    dispatch(startPreviewLoad());
    const url = cbApiUrl(getState().app.rootPath, `render/${item}`);
    return fetch(url)
      .then(res => {
        if (!res.ok) {
            return res.text().then((data) => {
              dispatch(storePreview({[item]: null}));
              dispatch(stopPreviewLoad());
            });
        }
        return res.text();
      })
      .then(
        (result) => {
          dispatch(storePreview({[item]: result}));
          dispatch(stopPreviewLoad());
        },
      )
    }
};

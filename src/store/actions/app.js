import fetch from 'cross-fetch';
import { setLocationId, fetchTreeItems, setPage, savePage } from './items';
import { setSearchPage } from './search';
import { buildUrl } from '../../helpers';
import {
  INITIAL_SETUP,
  CONFIG_LOADED,
  TOGGLE_COLUMN,
  FETCH_CONFIG,
  SET_SECTION_ID,
  SET_SELECTED_ITEM,
  SET_ITEMS_LIMIT,
  TOGGLE_PREVIEW,
  START_PREVIEW_LOAD,
  STOP_PREVIEW_LOAD,
  FETCH_PREVIEW,
} from '../actionTypes';

export const initialSetup = (data) => {
  return dispatch => {
    dispatch(receiveOverrides(data));
    dispatch(fetchConfig());
  }
};

const receiveOverrides = (data) => {
  return {
    type: INITIAL_SETUP,
    data,
  }
};

const configLoaded = (isLoaded) => {
  return {
    type: CONFIG_LOADED,
    isLoaded,
  };
};

const receiveConfig = (config) => {
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

export const saveSectionId = (id) => {
  return {
    type: SET_SECTION_ID,
    id: isNaN(id) ? id : +id
  }
};

export const setSectionId = (id) => {
  return dispatch => {
    dispatch(savePage(1));
    dispatch(saveSectionId(id));
    dispatch(setLocationId(id));
    dispatch(fetchTreeItems());
  }
};

const fetchConfig = () => {
  return (dispatch, getState) => {
    return fetch(buildUrl(getState, 'config'))
      .then(res => res.json())
      .then(
        (config) => {
          dispatch(receiveConfig(config));
          dispatch(saveSectionId(getState().app.config.start_location || config.sections[0].id));
          dispatch(setLocationId(getState().app.sectionId));
          dispatch(fetchTreeItems());
          dispatch(configLoaded(true));
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
    if (!getState().app.config.has_preview || !getState().app.showPreview || getState().app.previews[item] || item === null) return;
    dispatch(startPreviewLoad());
    const url = buildUrl(getState, `render/${item}`, {}, false);
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

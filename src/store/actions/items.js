import fetch from 'cross-fetch';
import { buildUrl } from '../../helpers/index';
import {
  FETCH_TREE,
  START_TREE_LOAD,
  STOP_TREE_LOAD,
  SET_LOCATION_ID,
  FETCH_LOCATION_ITEMS,
  START_LOCATION_LOAD,
  STOP_LOCATION_LOAD,
  SET_PAGE,
  SET_PREVIEW_ITEM,
} from '../actionTypes';

const startTreeLoad = () => {
  return {
    type: START_TREE_LOAD
  };
};

const stopTreeLoad = () => {
  return {
    type: STOP_TREE_LOAD
  };
};

const getTreeItems = (items) => {
  return {
    type: FETCH_TREE,
    items,
  }
};

export const fetchTreeItems = () => {
  return (dispatch, getState) => {
    dispatch(startTreeLoad());
    const url = buildUrl(getState, `browse/${getState().app.sectionId}/locations`);
    return fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          dispatch(getTreeItems(result.children));
          dispatch(stopTreeLoad());
        },
      )
    }
};

const saveLocationId = (id) => {
  return {
    type: SET_LOCATION_ID,
    id,
  }
};

export const setLocationId = (id) => {
  return dispatch => {
    dispatch(savePage(1));
    dispatch(saveLocationId(id));
    dispatch(fetchLocationItems());
  }
};

const getLocationItems = (items) => {
  return {
    type: FETCH_LOCATION_ITEMS,
    items,
  }
};

const startLocationLoad = () => {
  return {
    type: START_LOCATION_LOAD
  };
};

const stopLocationLoad = () => {
  return {
    type: STOP_LOCATION_LOAD
  };
};

export const fetchLocationItems = () => {
  return (dispatch, getState) => {
    dispatch(startLocationLoad());
    const url = buildUrl(getState, `browse/${getState().items.locationId}/items`, {limit: getState().app.itemsLimit, page: getState().items.currentPage});
    return fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          dispatch(getLocationItems(result));
          dispatch(stopLocationLoad());
          dispatch(setPreviewItem(result.parent.value ? result.parent.value : null));
        },
      )
    }
};

export const savePage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

export const setPage = (page) => {
  return dispatch => {
    dispatch(savePage(page));
    dispatch(fetchLocationItems());
  }
};

export const setPreviewItem = (id) => {
  return {
    type: SET_PREVIEW_ITEM,
    id,
  };
};

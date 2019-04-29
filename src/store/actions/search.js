import fetch from 'cross-fetch';
import { buildUrl } from '../../helpers/index';
import {
  START_SEARCH_LOAD,
  STOP_SEARCH_LOAD,
  SET_SEARCH_TERM,
  FETCH_SEARCH,
  SET_SEARCH_PAGE,
  SET_SEARCH_PREVIEW_ITEM,
} from '../actionTypes';

const startLoad = () => {
  return {
    type: START_SEARCH_LOAD
  };
};

const stopLoad = () => {
  return {
    type: STOP_SEARCH_LOAD
  };
};

const getItems = (items) => {
  return {
    type: FETCH_SEARCH,
    items,
  }
};

export const setSearchTerm = (term) => {
  return {
    type: SET_SEARCH_TERM,
    term,
  }
};

export const fetchItems = () => {
  return (dispatch, getState) => {
    if (!getState().search.searchTerm) return dispatch(getItems({}));
    dispatch(startLoad());
    const url = buildUrl(getState, 'search', {searchText: getState().search.searchTerm, limit: getState().app.itemsLimit, page: getState().search.currentPage});
    return fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          dispatch(getItems(result));
          dispatch(stopLoad());
        },
      )
    }
};

const savePage = (page) => {
  return {
    type: SET_SEARCH_PAGE,
    page,
  }
};

export const setSearchPage = (page) => {
  return dispatch => {
    dispatch(savePage(page));
    dispatch(fetchItems());
  }
};

export const setPreviewItem = (id) => {
  return {
    type: SET_SEARCH_PREVIEW_ITEM,
    id,
  };
};

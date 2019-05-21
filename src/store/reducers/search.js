import {
  START_SEARCH_LOAD,
  STOP_SEARCH_LOAD,
  SET_SEARCH_TERM,
  FETCH_SEARCH,
  SET_SEARCH_PAGE,
  SET_SEARCH_PREVIEW_ITEM,
} from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  items: {},
  searchTerm: '',
  currentPage: 1,
  previewItem: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_SEARCH_LOAD:
      return {
        ...state,
        isLoading: true,
      };

    case STOP_SEARCH_LOAD:
      return {
        ...state,
        isLoading: false,
      };

    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.term,
      };

    case FETCH_SEARCH:
      return {
        ...state,
        items: action.items,
      };

    case SET_SEARCH_PAGE:
      return {
        ...state,
        currentPage: action.page,
      };

    case SET_SEARCH_PREVIEW_ITEM:
      return {
        ...state,
        previewItem: action.id,
      };

    default:
      return state;
  }
};

import {
  START_TREE_LOAD,
  STOP_TREE_LOAD,
  START_LOCATION_LOAD,
  STOP_LOCATION_LOAD,
  FETCH_TREE,
  SET_LOCATION_ID,
  FETCH_LOCATION_ITEMS,
  SET_PAGE,
  SET_PREVIEW_ITEM,
} from '../actionTypes';

const INITIAL_STATE = {
  isTreeLoading: false,
  isLocationLoading: false,
  locationId: null,
  treeItems: [],
  locationItems: {},
  currentPage: 1,
  previewItem: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_TREE_LOAD:
      return {
        ...state,
        isTreeLoading: true,
      };

    case STOP_TREE_LOAD:
      return {
        ...state,
        isTreeLoading: false,
      };

    case START_LOCATION_LOAD:
      return {
        ...state,
        isLocationLoading: true,
      };

    case STOP_LOCATION_LOAD:
      return {
        ...state,
        isLocationLoading: false,
      };

    case FETCH_TREE:
      return {
        ...state,
        treeItems: action.items,
      };

    case SET_LOCATION_ID:
      return {
        ...state,
        locationId: action.id,
      };

    case FETCH_LOCATION_ITEMS:
      return {
        ...state,
        locationItems: action.items,
      };

    case SET_PAGE:
      return {
        ...state,
        currentPage: action.page,
      };

    case SET_PREVIEW_ITEM:
      return {
        ...state,
        previewItem: action.id,
      };

    default:
      return state;
  }
};

import {
  START_TREE_LOAD,
  STOP_TREE_LOAD,
  START_LOCATION_LOAD,
  STOP_LOCATION_LOAD,
  FETCH_TREE,
  SET_SECTION_ID,
  SET_LOCATION_ID,
  FETCH_LOCATION_ITEMS,
  SET_PAGE,
  SET_PREVIEW_ITEM,
  START_PREVIEW_LOAD,
  STOP_PREVIEW_LOAD,
} from '../actionTypes';

const INITIAL_STATE = {
  isTreeLoading: false,
  isLocationLoading: false,
  sectionId: null,
  locationId: null,
  treeItems: [],
  locationItems: {},
  currentPage: 1,
  previewItem: '',
  isPreviewLoading: false,
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

    case SET_SECTION_ID:
      return {
        ...state,
        sectionId: action.id,
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

    case START_PREVIEW_LOAD:
      return {
        ...state,
        isPreviewLoading: true,
      };

    case STOP_PREVIEW_LOAD:
      return {
        ...state,
        isPreviewLoading: false,
      };

    default:
      return state;
  }
};

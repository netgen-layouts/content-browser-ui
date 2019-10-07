import { extractCustomParams } from '../../helpers';
import {
  CONFIG_LOADED,
  FETCH_CONFIG,
  INITIAL_SETUP,
  TOGGLE_COLUMN,
  SET_SECTION_ID,
  SET_SELECTED_ITEM,
  SET_ITEMS_LIMIT,
  TOGGLE_PREVIEW,
  FETCH_PREVIEW,
  START_PREVIEW_LOAD,
  STOP_PREVIEW_LOAD,
} from '../actionTypes';

const INITIAL_STATE = {
  itemType: '',
  isLoaded: false,
  config: {},
  itemsLimit: null,
  activeColumns: [],
  selectedItems: [],
  onCancel: null,
  onConfirm: null,
  showPreview: null,
  limits: [
    {id: 5, name: 5},
    {id: 10, name: 10},
    {id: 25, name: 25},
  ],
  previews: {},
  isPreviewLoading: false,
  customParams: {},
  sectionId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONFIG_LOADED:
      return {
        ...state,
        isLoaded: action.isLoaded,
      };

    case INITIAL_SETUP:
      return {
        ...state,
        ...action.data,
        customParams: extractCustomParams(action.data.config),
      };

    case FETCH_CONFIG:
      const storedColumns = localStorage.getItem('cb_activeColumns');
      const activeColumns = storedColumns ? JSON.parse(storedColumns) : action.config.default_columns;
      return {
        ...state,
        activeColumns,
        config: {
          ...action.config,
          ...state.config,
        },
      };

    case TOGGLE_COLUMN:
      let columns;
      if (action.toggle) {
        columns = [...state.activeColumns, action.id];
      } else {
        columns = state.activeColumns.filter(column => column !== action.id);
      }
      localStorage.setItem('cb_activeColumns', JSON.stringify(columns));
      return {
        ...state,
        activeColumns: columns,
      };

    case SET_SELECTED_ITEM:
      let selectedItems;
      if (action.selected) {
        selectedItems = parseInt(state.config.max_selected, 10) === 1 ? [action.item] : [...state.selectedItems, action.item];
      } else {
        selectedItems = state.selectedItems.filter(item => item !== action.item);
      }
      return {
        ...state,
        selectedItems,
      };

    case SET_SECTION_ID:
      return {
        ...state,
        sectionId: action.id,
      };

    case SET_ITEMS_LIMIT:
      localStorage.setItem('cb_itemsLimit', action.limit);
      return {
        ...state,
        itemsLimit: action.limit,
      };

    case TOGGLE_PREVIEW:
      localStorage.setItem('cb_showPreview', action.toggle);
      return {
        ...state,
        showPreview: action.toggle,
      };

    case FETCH_PREVIEW:
      return {
        ...state,
        previews: {
          ...state.previews,
          ...action.preview,
        },
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

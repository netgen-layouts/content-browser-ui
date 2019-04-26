import {
  CONFIG_LOADED,
  FETCH_CONFIG,
  SET_ROOT_PATH,
  TOGGLE_COLUMN,
  SET_SELECTED_ITEM,
  SET_ITEMS_LIMIT,
  TOGGLE_PREVIEW,
  FETCH_PREVIEW,
} from '../actionTypes';

const INITIAL_STATE = {
  rootPath: '',
  isLoaded: false,
  config: {},
  itemsLimit: localStorage.getItem('cb_itemsLimit') || 10,
  activeColumns: [],
  selectedItems: [],
  maxSelected: 1,
  showPreview: localStorage.getItem('cb_showPreview') ? JSON.parse(localStorage.getItem('cb_showPreview')) : false,
  limits: [
    {id: 5, name: 5},
    {id: 10, name: 10},
    {id: 25, name: 25},
  ],
  previews: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONFIG_LOADED:
      return {
        ...state,
        isLoaded: true,
      };

    case FETCH_CONFIG:
      const storedColumns = localStorage.getItem('cb_activeColumns');
      const activeColumns = storedColumns ? JSON.parse(storedColumns) : action.config.default_columns;
      return {
        ...state,
        activeColumns,
        config: action.config,
      };

    case SET_ROOT_PATH:
      return {
        ...state,
        rootPath: action.path,
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
        selectedItems = state.max_selected === 1 ? [action.item] : [...state.selectedItems, action.item];
      } else {
        selectedItems = state.selectedItems.filter(item => item !== action.item);
      }
      return {
        ...state,
        selectedItems,
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

    default:
      return state;
  }
};

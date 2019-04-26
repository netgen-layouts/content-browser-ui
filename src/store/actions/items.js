import fetch from 'cross-fetch';
import { buildUrl } from '../../helpers/index';
import {
  FETCH_TREE,
  START_TREE_LOAD,
  STOP_TREE_LOAD,
  SET_SECTION_ID,
  SET_LOCATION_ID,
  FETCH_LOCATION_ITEMS,
  START_LOCATION_LOAD,
  STOP_LOCATION_LOAD,
  SET_PAGE,
  SET_PREVIEW_ITEM,
  START_PREVIEW_LOAD,
  STOP_PREVIEW_LOAD,
  FETCH_PREVIEW,
} from '../actionTypes';

const cbBasePath = document.querySelector('meta[name=ngcb-base-path]').getAttribute('content');
const cbBaseApiPath = '/api/v1/';

const cbApiUrl = (rootPath, path) => {
  return `${cbBasePath}${cbBaseApiPath}${rootPath}/${path}`.replace(/\/{2,}/g, '/');
}

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
    const url = cbApiUrl(getState().app.rootPath, `browse/${getState().items.sectionId}/locations`);
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

export const saveSectionId = (id) => {
  return {
    type: SET_SECTION_ID,
    id,
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
    const url = buildUrl(cbApiUrl(getState().app.rootPath, `browse/${getState().items.locationId}/items`), {limit: getState().app.itemsLimit, page: getState().items.currentPage});
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

const savePage = (page) => {
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

const savePreviewItem = (id) => {
  return {
    type: SET_PREVIEW_ITEM,
    id,
  };
};

export const setPreviewItem = (id) => {
  return dispatch => {
    dispatch(savePreviewItem(id));
    dispatch(fetchPreview());
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

export const fetchPreview = () => {
  return (dispatch, getState) => {
    const previewItem = getState().items.previewItem;
    if (!getState().app.showPreview || getState().app.previews[previewItem] || previewItem === null) return;
    dispatch(startPreviewLoad());
    const url = cbApiUrl(getState().app.rootPath, `render/${previewItem}`);
    return fetch(url)
      .then(res => {
        if (!res.ok) {
            return res.text().then((data) => {
              dispatch(storePreview({[previewItem]: null}));
              dispatch(stopPreviewLoad());
            });
        }
        return res.text();
      })
      .then(
        (result) => {
          dispatch(storePreview({[previewItem]: result}));
          dispatch(stopPreviewLoad());
        },
      )
    }
};

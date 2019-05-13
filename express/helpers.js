const items = require('./data/items.json');
const config = require('./data/config.json');

const getItem = (id) => {
  return items.find(item => item.location_id === id);
}

const getChildrenItems = (req) => {
  const parentLocation = parseInt(req.params.id, 10);
  let children = [];
  items.forEach(item => {
    if (item.parent_id === parentLocation) {
      const newItem = {...item};
      delete newItem.id;
      delete newItem.parent_id;
      delete newItem.has_sub_locations;
      delete newItem.preview;
      children.push(newItem);
    }
  });
  const children_count = children.length;
  const parent = getItem(parentLocation);
  const path = getPath(parent, []);
  const page = req.query.page || 1;
  const limit = req.query.limit || children_count;
  children = children.slice((page - 1) * limit, page * limit);
  const data = {
    path,
    parent,
    children,
    children_count,
  };
  return data;
}

const getLocationItems = (req) => {
  const parentLocation = parseInt(req.params.id, 10);
  const children = [];
  items.forEach(item => {
    if (item.parent_id === parentLocation) {
      const newItem = {...item};
      delete newItem.selectable;
      delete newItem.value;
      delete newItem.location_id;
      delete newItem.columns;
      delete newItem.preview;
      newItem.columns = {
        "name": item.columns.name,
      };
      children.push(newItem);
    }
  });
  return {
    children,
  };
}

const getSections = () => {
  const sections = [];
  items.forEach((item) => {
    if (item.parent_id === null) {
      sections.push({
        "id":item.id,
        "parent_id":item.parent_id,
        "name":item.name,
        "has_sub_items":item.has_sub_items,
        "has_sub_locations":item.has_sub_locations,
        "visible":item.visible,
        "columns":{
          "name":item.columns.name,
        },
      });
    }
  });
  return sections;
}

const getPath = (item, path) => {
  path.unshift({
    "id":item.id,
    "name": item.name,
  });
  if (item.parent_id) {
    getPath(getItem(item.parent_id), path);
  }
  return path;
}

const getConfig = () => {
  const sections = getSections();
  return {
    ...config,
    sections,
  };
}

const getPreview = (req) => {
  const id = parseInt(req.params.id, 10);
  const item = getItem(id);
  return item.preview;
}

const getSearchResults = (req) => {
  let children = [];
  if (req.query.searchText.length > 2) items.forEach(item => {
    if (children.length < 12) {
      const newItem = {...item};
      delete newItem.id;
      delete newItem.parent_id;
      delete newItem.has_sub_locations;
      delete newItem.preview;
      children.push(newItem);
    }
  });
  const children_count = children.length;
  const page = req.query.page || 1;
  const limit = req.query.limit || children_count;
  children = children.slice((page - 1) * limit, page * limit);
  const data = {
    children,
    children_count,
  };
  return data;
}

module.exports = {
  getChildrenItems,
  getLocationItems,
  getPath,
  getConfig,
  getItem,
  getPreview,
  getSearchResults,
}

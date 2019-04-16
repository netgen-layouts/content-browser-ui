import React, { useState, useEffect } from 'react';
import Browser from './components/Browser';
import { buildUrl } from './helpers/index';

function App({ min_selected = 1, max_selected = 1, startLocation = null, onCancel, onConfirm, rootPath }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [config, setConfig] = useState({});
  const [sectionId, setSectionId] = useState(startLocation);
  const [locationId, setLocationId] = useState(null);
  const [treeItems, setTreeItems] = useState([]);
  const [sectionItems, setSectionItems] = useState({});
  const [isLoadingTree, setIsLoadingTree] = useState(false);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [activeColumns, setActiveColumns] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemsLimit, setItemsLimit] = useState(localStorage.getItem('cb_itemsLimit') || 25);
  const [currentPage, setCurrentPage] = useState(1);
  const [previewItem, setPreviewItem] = useState(null);
  const [previews, setPreviews] = useState({});
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [currentPreview, setCurrentPreview] = useState(null);
  const [showPreview, setShowPreview] = useState(localStorage.getItem('cb_showPreview') ? JSON.parse(localStorage.getItem('cb_showPreview')) : false);

  const cbBasePath = document.querySelector('meta[name=ngcb-base-path]').getAttribute('content');
  const cbBaseApiPath = '/api/v1/';

  const cbApiUrl = (path) => {
    return `${cbBasePath}${cbBaseApiPath}${rootPath}/${path}`.replace(/\/{2,}/g, '/');
  }

  useEffect(() => fetchConfig(), []);
  useEffect(() => fetchTreeItems(), [sectionId]);
  useEffect(() => fetchSectionItems(), [locationId, itemsLimit, currentPage]);
  useEffect(() => setCurrentPage(1), [sectionId, locationId]);
  useEffect(() => {
    if (previews[previewItem]) {
      setCurrentPreview(previews[previewItem]);
    } else {
      fetchPreview(previewItem);
    }
  }, [previewItem, showPreview]);
  useEffect(() => localStorage.setItem('cb_showPreview', showPreview), [showPreview]);
  useEffect(() => setLocationId(sectionId), [sectionId]);
  useEffect(() => {
    setCurrentPage(1);
    localStorage.setItem('cb_itemsLimit', itemsLimit);
  }, [itemsLimit]);


  const fetchConfig = () => {
    fetch(cbApiUrl('config'))
      .then(res => res.json())
      .then(
        (result) => {
          setConfig(result);
          setSectionId(sectionId || result.sections[0].id.toString());
          setLocationId(sectionId || result.sections[0].id.toString());

          /* set active columns from local storage or default columns */
          const storedColumns = localStorage.getItem('cb_activeColumns');
          setActiveColumns(storedColumns ? JSON.parse(storedColumns) : result.default_columns);

          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      )
  };

  const fetchTreeItems = () => {
    if (sectionId === null) return;
    setIsLoadingTree(true);
    fetch(cbApiUrl(`browse/${sectionId}/locations`))
      .then(res => res.json())
      .then(
        (result) => {
          setTreeItems(result.children);
          setIsLoadingTree(false);
        },
        (error) => {
          setIsLoadingTree(false);
        }
      )
  };

  const fetchSectionItems = () => {
    if (locationId === null) return;
    setIsLoadingItems(true);
    fetch(buildUrl(cbApiUrl(`browse/${locationId}/items`), {limit: itemsLimit, page: currentPage}))
      .then(res => res.json())
      .then(
        (result) => {
          setPreviewItem(locationId);
          setSectionItems(result);
          setIsLoadingItems(false);
        },
        (error) => {
          setIsLoadingItems(false);
        }
      )
  };

  const fetchPreview = (id) => {
    if (id === null || !showPreview) return;
    setIsPreviewLoading(true);
    fetch(buildUrl(cbApiUrl(`render/${id}`)))
      .then(res => res.text())
      .then(
        (result) => {
          setPreviews({
            ...previews,
            [id]: result,
          });
          setCurrentPreview(result);
          setIsPreviewLoading(false);
        },
        (error) => {
          setIsPreviewLoading(false);
        }
      )
  };

  const handleToggleColumn = (id, active) => {
    let columns;
    if (active) {
      columns = [...activeColumns, id];
    } else {
      columns = activeColumns.filter(column => column !== id);
    }
    setActiveColumns(columns);
    localStorage.setItem('cb_activeColumns', JSON.stringify(columns));
  };

  const handleSetSelectedItem = (selectedItem, add) => {
    if (add) {
      max_selected === 1 ? setSelectedItems([selectedItem]) : setSelectedItems([...selectedItems, selectedItem]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== selectedItem));
    }
  };

  return (
    <Browser
      error={error}
      isLoaded={isLoaded}
      config={config}
      sectionId={sectionId}
      locationId={locationId}
      setLocationId={setLocationId}
      setSectionId={setSectionId}
      treeItems={treeItems}
      sectionItems={sectionItems}
      isLoadingTree={isLoadingTree}
      isLoadingItems={isLoadingItems}
      activeColumns={activeColumns}
      toggleColumn={handleToggleColumn}
      selectedItems={selectedItems}
      setSelectedItems={handleSetSelectedItem}
      min_selected={min_selected}
      max_selected={max_selected}
      onCancel={onCancel}
      onConfirm={onConfirm}
      itemsLimit={itemsLimit}
      setItemsLimit={setItemsLimit}
      currentPage={currentPage}
      setPage={setCurrentPage}
      setPreviewItem={setPreviewItem}
      preview={currentPreview}
      isPreviewLoading={isPreviewLoading}
      showPreview={showPreview}
      setShowPreview={setShowPreview}
    />
  );
}

export default App;

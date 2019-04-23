import React, { useState, useEffect } from 'react';
import Browser from './components/Browser';
// import S from './App.module.css';
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

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [searchPreviewItem, setSearchPreviewItem] = useState(null);
  const [currentSearchPreview, setCurrentSearchPreview] = useState(null);

  const cbBasePath = document.querySelector('meta[name=ngcb-base-path]').getAttribute('content');
  const cbBaseApiPath = '/api/v1/';

  const cbApiUrl = (path) => {
    return `${cbBasePath}${cbBaseApiPath}${rootPath}/${path}`.replace(/\/{2,}/g, '/');
  }

  const handleKeypress = (e) => {
    e.keyCode === 27 && onCancel();
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeypress);
    fetchConfig();
  }, []);
  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeypress);
    }
  }, []);
  useEffect(() => fetchTreeItems(), [sectionId]);
  useEffect(() => fetchSectionItems(), [locationId, currentPage]);
  useEffect(() => setCurrentPage(1), [sectionId]);
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
    setCurrentSearchPage(1);
    fetchSectionItems();
    fetchSearchResults();
    localStorage.setItem('cb_itemsLimit', itemsLimit);
  }, [itemsLimit]);

  useEffect(() => fetchSearchResults(), [currentSearchPage]);
  useEffect(() => {
    if (previews[searchPreviewItem]) {
      setCurrentSearchPreview(previews[searchPreviewItem]);
    } else {
      fetchPreview(searchPreviewItem, true);
    }
  }, [searchPreviewItem, showPreview]);

  const fetchConfig = () => {
    const abortController = new AbortController();
    fetch(cbApiUrl('config'), {signal: abortController.signal})
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

    return function cleanup() {
      abortController.abort();
    }
  };

  const fetchTreeItems = () => {
    if (sectionId === null) return;
    const abortController = new AbortController();
    setIsLoadingTree(true);
    fetch(cbApiUrl(`browse/${sectionId}/locations`), {signal: abortController.signal})
      .then(res => res.json())
      .then(
        (result) => {
          setTreeItems(result.children);
          setIsLoadingTree(false);
        },
        (error) => {
        }
      )

    return function cleanup() {
      abortController.abort();
    }
  };

  const fetchSectionItems = () => {
    if (locationId === null) return;
    const abortController = new AbortController();
    setIsLoadingItems(true);
    fetch(buildUrl(cbApiUrl(`browse/${locationId}/items`), {limit: itemsLimit, page: currentPage}), {signal: abortController.signal})
      .then(res => res.json())
      .then(
        (result) => {
          setPreviewItem(result.parent.value ? result.parent.value : null);
          setSectionItems(result);
          setIsLoadingItems(false);
        },
        (error) => {
        }
      )

    return function cleanup() {
      abortController.abort();
    }
  };

  const fetchPreview = (id, isSearchItem) => {
    if (id === null || !showPreview) {
      isSearchItem ? setCurrentSearchPreview(null) : setCurrentPreview(null);
      return;
    }
    const abortController = new AbortController();
    setIsPreviewLoading(true);
    fetch(buildUrl(cbApiUrl(`render/${id}`)), {signal: abortController.signal})
      .then(res => res.text())
      .then(
        (result) => {
          setPreviews({
            ...previews,
            [id]: result,
          });
          isSearchItem ? setCurrentSearchPreview(result) : setCurrentPreview(result);
          setIsPreviewLoading(false);
        },
        (error) => {
          setIsPreviewLoading(false);
        }
      )

    return function cleanup() {
      abortController.abort();
    }
  };

  const abortSearchController = new AbortController();
  const fetchSearchResults = () => {
    console.log('FETCH SEARCH');
    if (!searchTerm) return;
    setIsSearchLoading(true);
    fetch(buildUrl(cbApiUrl(`search`), {searchText: searchTerm, limit: itemsLimit, page: currentSearchPage}), {signal: abortSearchController.signal})
      .then(res => res.json())
      .then(
        (result) => {
          setSearchResults(result);
          setIsSearchLoading(false);
        },
        (error) => {
        }
      )

    return function cleanup() {
      abortSearchController.abort();
    }
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

  const handleSetLocationId = (id) => {
    setCurrentPage(1);
    setLocationId(id);
  }

  const handleSearch = () => {
    setCurrentSearchPage(1);
    fetchSearchResults();
  }

  return (
    <Browser
      error={error}
      isLoaded={isLoaded}
      config={config}
      sectionId={sectionId}
      locationId={locationId}
      setLocationId={handleSetLocationId}
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
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      handleSearch={handleSearch}
      isSearchLoading={isSearchLoading}
      searchResults={searchResults}
      currentSearchPage={currentSearchPage}
      setCurrentSearchPage={setCurrentSearchPage}
      searchPreview={currentSearchPreview}
      setSearchPreviewItem={setSearchPreviewItem}
    />
  );
}

export default App;

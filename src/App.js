import React, { useState, useEffect } from 'react';
import Browser from './components/Browser';

function App({ min_selected = 1, max_selected = 3 }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [config, setConfig] = useState({});
  const [sectionId, setSectionId] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [treeItems, setTreeItems] = useState([]);
  const [sectionItems, setSectionItems] = useState([]);
  const [isLoadingTree, setIsLoadingTree] = useState(false);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [parentLocation, setParentLocation] = useState({});
  const [currentPath, setCurrentPath] = useState([]);
  const [activeColumns, setActiveColumns] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => fetchConfig(), []);
  useEffect(() => fetchTreeItems(), [sectionId]);
  useEffect(() => fetchSectionItems(), [locationId]);

  const fetchConfig = () => {
    fetch('/cb/api/v1/ezcontent/config')
      .then(res => res.json())
      .then(
        (result) => {
          setConfig(result);
          setSectionId(result.sections[0].id);
          setLocationId(result.sections[0].id);

          /* set active columns from local storage or default columns */
          const storedColumns = localStorage.getItem('activeColumns');
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
    if (!sectionId) return;
    setIsLoadingTree(true);
    fetch(`/cb/api/v1/ezcontent/browse/${sectionId}/locations`)
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
    if (!locationId) return;
    setIsLoadingItems(true);
    fetch(`/cb/api/v1/ezcontent/browse/${locationId}/items`)
      .then(res => res.json())
      .then(
        (result) => {
          setCurrentPath(result.path);
          setParentLocation(result.parent);
          setSectionItems(result.children);
          setIsLoadingItems(false);
        },
        (error) => {
          setIsLoadingItems(false);
        }
      )
  };

  const handleChangeSectionId = (id) => {
    setSectionId(id);
    setLocationId(id);
  };

  const handleToggleColumn = (id, active) => {
    let columns;
    if (active) {
      columns = [...activeColumns, id];
    } else {
      columns = activeColumns.filter(column => column !== id);
    }
    setActiveColumns(columns);
    localStorage.setItem('activeColumns', JSON.stringify(columns));
  };

  const handleSetSelectedItem = (selectedItem, add) => {
    if (add) {
      max_selected === 1 ? setSelectedItems([selectedItem]) : setSelectedItems([...selectedItems, selectedItem]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== selectedItem));
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Browser
        config={config}
        sectionId={sectionId}
        locationId={locationId}
        setLocationId={setLocationId}
        setSectionId={handleChangeSectionId}
        treeItems={treeItems}
        sectionItems={sectionItems}
        isLoadingTree={isLoadingTree}
        isLoadingItems={isLoadingItems}
        parentLocation={parentLocation}
        currentPath={currentPath}
        activeColumns={activeColumns}
        toggleColumn={handleToggleColumn}
        selectedItems={selectedItems}
        setSelectedItems={handleSetSelectedItem}
        min_selected={min_selected}
        max_selected={max_selected}
      />
    );
  }
}

export default App;

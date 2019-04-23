import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Tree from './Tree';
import Items from './Items';
import Search from './Search';
import Select from './utils/Select';
import Tabs from './Tabs';
import Preview from './Preview';
import Footer from './Footer';
import Toggle from './utils/Toggle';
import ListIcon from '@material-ui/icons/List';
import SearchIcon from '@material-ui/icons/Search';
import Loader from './utils/Loader';
import S from './Browser.module.css';

function BrowserLoader() {
  return <div className={S.loading}><Loader/></div>
}

function RenderToggle(props) {
  return (
    <Toggle
      name="togglePreview"
      id="togglePreview"
      onChange={(e) => props.setShowPreview(e.target.checked)}
      checked={props.showPreview}
      label="Preview"
    />
  )
}

function BrowserContent(props) {
  return (
    <div className={S.content}>
      <Tabs headerContent={<RenderToggle setShowPreview={props.setShowPreview} showPreview={props.showPreview} />}>
        <div id="tab-browse" label="Browse" icon={<ListIcon fontSize="default" color="inherit" />}>
          <div className={S.panels}>
            {props.config.has_tree &&
              <div className={S.treePanel}>
                <Select
                  options={props.config.sections.map(section => ({value: section.id, label: section.name}))}
                  onChange={props.setSectionId}
                  value={props.sectionId}
                />
                <div className={S.tree}>
                  <Tree
                    items={props.treeItems}
                    onChangeLocation={(id) => props.setLocationId(id)}
                    isLoading={props.isLoadingTree}
                    locationId={props.locationId}
                  />
                </div>
              </div>
            }
            <div className={S.itemsPanel}>
              <Items
                className={S.itemsPanel}
                items={props.sectionItems}
                isLoading={props.isLoadingItems}
                setLocationId={props.setLocationId}
                availableColumns={props.config.available_columns}
                toggleColumn={props.toggleColumn}
                activeColumns={props.activeColumns}
                setSelectedItems={props.setSelectedItems}
                selectedItems={props.selectedItems}
                min_selected={props.min_selected}
                max_selected={props.max_selected}
                itemsLimit={props.itemsLimit}
                setItemsLimit={props.setItemsLimit}
                setPage={props.setPage}
                currentPage={props.currentPage}
                setPreviewItem={props.setPreviewItem}
              />
            </div>
            <CSSTransition
              in={props.showPreview}
              unmountOnExit
              timeout={250}
              classNames={{
                enter: S.slideEnter,
                enterActive: S.slideActiveEnter,
                exit: S.slideExit,
                exitActive: S.slideActiveExit,
              }}
            >
              <Preview preview={props.preview} isLoading={props.isPreviewLoading} />
            </CSSTransition>
          </div>
        </div>
        {props.config.has_search && <div id="tab-search" label="Search" icon={<SearchIcon fontSize="small" color="inherit" />}>
          <div className={S.panels}>
            <Search
              cbApiUrl={props.cbApiUrl}
              availableColumns={props.config.available_columns}
              toggleColumn={props.toggleColumn}
              activeColumns={props.activeColumns}
              setSelectedItems={props.setSelectedItems}
              selectedItems={props.selectedItems}
              min_selected={props.min_selected}
              max_selected={props.max_selected}
              itemsLimit={props.itemsLimit}
              setItemsLimit={props.setItemsLimit}
              searchResults={props.searchResults}
              searchTerm={props.searchTerm}
              setSearchTerm={props.setSearchTerm}
              handleSearch={props.handleSearch}
              isLoading={props.isSearchLoading}
              currentPage={props.currentSearchPage}
              setPage={props.setCurrentSearchPage}

              setLocationId={props.setLocationId}
              setPreviewItem={props.setSearchPreviewItem}
            />
            <CSSTransition
              in={props.showPreview}
              unmountOnExit
              timeout={250}
              classNames={{
                enter: S.slideEnter,
                enterActive: S.slideActiveEnter,
                exit: S.slideExit,
                exitActive: S.slideActiveExit,
              }}
            >
              <Preview preview={props.searchPreview} isLoading={props.isPreviewLoading} />
            </CSSTransition>
          </div>
        </div>}
      </Tabs>
      <Footer selectedItems={props.selectedItems} setSelectedItems={props.setSelectedItems} min_selected={props.min_selected} onCancel={props.onCancel} onConfirm={props.onConfirm} />
    </div>
  );
}

function Browser(props) {
  return (
    <div className={S.browser}>
      <div className={S.dialog}>
        {props.error ?
          <div>Error: {props.error.message}</div>
          :
          !props.isLoaded ?
            <BrowserLoader/>
            :
            <BrowserContent {...props} />
        }
      </div>
    </div>
  );
}

export default Browser;

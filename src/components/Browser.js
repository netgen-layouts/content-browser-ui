import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import Tree from '../containers/Tree';
import Items from '../containers/Items';
import Search from './Search';
import Tabs from './Tabs';
import Preview from './Preview';
import TogglePreview from './TogglePreview';
import Footer from './Footer';
import ListIcon from '@material-ui/icons/List';
import SearchIcon from '@material-ui/icons/Search';
import Loader from './utils/Loader';
import S from './Browser.module.css';

function BrowserContent(props) {
  return (
    <div className={S.content}>
      <Tabs headerContent={<TogglePreview />}>
        <div id="tab-browse" label="Browse" icon={<ListIcon fontSize="default" color="inherit" />}>
          <div className={S.panels}>
            {props.config.has_tree &&
              <div className={S.treePanel}>
                <Tree/>
              </div>
            }
            <div className={S.itemsPanel}>
              <Items/>
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
              <Preview previewItem={props.previewItem} isLoading={props.isPreviewLoading} />
            </CSSTransition>
          </div>
        </div>
        {props.config.has_search &&
          <div id="tab-search" label="Search" icon={<SearchIcon fontSize="small" color="inherit" />}>
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
          </div>
        }
      </Tabs>
      <Footer/>
    </div>
  );
}

function Browser(props) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeypress);
    props.fetchConfig();
  }, []);
  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeypress);
    }
  }, []);

  const handleKeypress = (e) => {
    e.keyCode === 27 && props.onCancel();
  }

  return (
    <div className={S.browser}>
      <div className={S.dialog}>
        {props.error ?
          <div>Error: {props.error.message}</div>
          :
          !props.isLoaded ?
            <div className={S.loading}><Loader/></div>
            :
            <BrowserContent {...props} />
        }
      </div>
    </div>
  );
}

export default Browser;

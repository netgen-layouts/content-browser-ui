import React, { useEffect } from 'react';
import Tree from '../containers/Tree';
import Items from '../containers/Items';
import Search from '../containers/Search';
import Tabs from './Tabs';
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
            <Items/>
          </div>
        </div>
        {props.config.has_search &&
          <div id="tab-search" label="Search" icon={<SearchIcon fontSize="small" color="inherit" />}>
            <div className={S.panels}>
              <Search/>
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

import React from 'react';
import Tree from './Tree';
import Items from './Items';
import Select from './utils/Select';
import Tabs from './Tabs';
import Footer from './Footer';
import ListIcon from '@material-ui/icons/List';
import SearchIcon from '@material-ui/icons/Search';
import S from './Browser.module.css';

function Browser(props) {
  return (
    <div className={S.browser}>
      <div className={S.dialog}>
        <div className={S.content}>
          <Tabs>
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
                    parentLocation={props.parentLocation}
                    currentPath={props.currentPath}
                    availableColumns={props.config.available_columns}
                    toggleColumn={props.toggleColumn}
                    activeColumns={props.activeColumns}
                    setSelectedItems={props.setSelectedItems}
                    selectedItems={props.selectedItems}
                    min_selected={props.min_selected}
                    max_selected={props.max_selected}
                  />
                </div>
              </div>
            </div>
            {props.config.has_search && <div id="tab-search" label="Search" icon={<SearchIcon fontSize="small" color="inherit" />}>
              <div className={S.panels}>
                Search tab
              </div>
            </div>}
          </Tabs>
          <Footer selectedItems={props.selectedItems} setSelectedItems={props.setSelectedItems} min_selected={props.min_selected} />
        </div>
      </div>
    </div>
  );
}

export default Browser;

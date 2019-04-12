import React from 'react';
import Tree from './Tree';
import Items from './Items';
import Select from './utils/Select';
import Tabs from './Tabs';
import S from './Browser.module.css';

function Browser(props) {
  return (
    <div className={S.browser}>
      <div className={S.dialog}>
        <div className={S.content}>
          <Tabs>
            <div id="tab-browse" label="Browse" icon="list">
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
                  />
                </div>
              </div>
            </div>
            {props.config.has_search && <div id="tab-search" label="Search" icon="search">
              Search tab
            </div>}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Browser;

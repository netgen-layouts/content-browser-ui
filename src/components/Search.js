import React from 'react';
import ItemsTable from './ItemsTable';
import Loader from './utils/Loader';
import Input from './utils/Input';
import Button from './utils/Button';
import TableSettings from './TableSettings';
import Preview from './Preview';
import S from './Search.module.css';
import I from './Items.module.css';

function Search(props) {
  return (
    <React.Fragment>
      <div className={S.searchPanel}>
        <div className={I.header}>
          <div className={S.search}>
            <Input
              onChange={(e) => props.setSearchTerm(e.target.value)}
              value={props.searchTerm}
              placeholder='Search...'
            />
            <Button onClick={props.fetchItems}>Search</Button>
          </div>
          <TableSettings />
        </div>
        {props.isLoading
          ? <Loader />
          : <ItemsTable {...props} showParentItem={false} />
        }
      </div>
      <Preview previewItem={props.previewItem} isLoading={props.isPreviewLoading} />
    </React.Fragment>
  );
}

export default Search;

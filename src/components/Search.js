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
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    props.fetchItems();
  };

  return (
    <>
      <div className={S.searchPanel}>
        <div className={I.header}>
          <form className={S.search} onSubmit={handleSearchSubmit}>
            <Input
              onChange={(e) => props.setSearchTerm(e.target.value)}
              value={props.searchTerm}
              placeholder='Search...'
              sufixed={true}
            />
            <Button type='submit' prefixed={true}>Search</Button>
          </form>
          <TableSettings />
        </div>
        {props.isLoading
          ? <Loader />
          : <ItemsTable {...props} showParentItem={false} previewItem={props.previewItem} />
        }
      </div>
      <Preview previewItem={props.previewItem} isLoading={props.isPreviewLoading} />
    </>
  );
}

export default Search;

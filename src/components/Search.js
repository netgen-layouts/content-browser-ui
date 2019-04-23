import React from 'react';
import ItemsTable from './ItemsTable';
import Loader from './utils/Loader';
import Input from './utils/Input';
import Button from './utils/Button';
import Checkbox from './utils/Checkbox';
import Dropdown from './utils/Dropdown';
import SettingsIcon from '@material-ui/icons/Settings';
import S from './Search.module.css';
import I from './Items.module.css';

function Search(props) {
  const handleChangeSearch = (e) => {
    props.setSearchTerm(e.target.value);
  };


  return (
    <div className={S.searchPanel}>
      <div>
        <div className={I.header}>
          <div className={S.search}>
            <Input
              onChange={handleChangeSearch}
              value={props.searchTerm}
              placeholder='Search...'
            />
            <Button onClick={props.handleSearch}>Search</Button>
          </div>
          <Dropdown label="Table options" icon={<SettingsIcon fontSize="small" color="inherit" />}>
            {props.availableColumns.map(column => {
              if (column.id === 'name') return false;
              return (
                <li key={column.id}>
                  <Checkbox
                    name="set-table-option"
                    id={`set-${column.id}`}
                    label={column.name}
                    onChange={(e) => props.toggleColumn(column.id, e.target.checked)}
                    checked={props.activeColumns.includes(column.id)}
                  />
                </li>
              );
            })}
          </Dropdown>
        </div>
        {props.isLoading ? <Loader /> : <ItemsTable {...props} items={props.searchResults} setPage={props.setPage} currentPage={props.currentPage} showParentItem={false} />}
      </div>
    </div>
  );
}

export default Search;

import React from 'react';
import ItemsTable from './ItemsTable';
import Breadcrumbs from './Breadcrumbs';
import Loader from './utils/Loader';
import Dropdown from './utils/Dropdown';
import Checkbox from './utils/Checkbox';
import Pager from './utils/Pager';
import SettingsIcon from '@material-ui/icons/Settings';
import S from './Items.module.css';

const calculatePages = (total, limit) => {
  const totalPages = parseInt(total / limit, 10);
  return (total % limit) === 0 ? totalPages : totalPages + 1;
}

function Items(props) {
  if (!props.items) {
    return '';
  } else if (props.isLoading) {
    return <Loader />;
  } else {
    return (
      <React.Fragment>
        <div className={S.header}>
          <Breadcrumbs items={props.items.path} setLocationId={props.setLocationId} />
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
        <ItemsTable {...props} />
        <Pager
          setItemsLimit={props.setItemsLimit}
          itemsLimit={props.itemsLimit}
          pages={calculatePages(props.items.children_count, props.itemsLimit)}
          setPage={props.setPage}
          currentPage={props.currentPage}
        />
      </React.Fragment>
    );
  }
}

export default Items;

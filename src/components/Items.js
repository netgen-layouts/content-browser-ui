import React from 'react';
import ItemsTable from './ItemsTable';
import Breadcrumbs from './Breadcrumbs';
import Loader from './utils/Loader';
import Dropdown from './utils/Dropdown';
import Checkbox from './utils/Checkbox';
import SettingsIcon from '@material-ui/icons/Settings';
import S from './Items.module.css';

function Items(props) {
  if (!props.items) {
    return '';
  } else if (props.isLoading) {
    return <Loader />;
  } else {
    return (
      <React.Fragment>
        <div className={S.header}>
          <Breadcrumbs items={props.currentPath} setLocationId={props.setLocationId} />
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
                    iconSize={16}
                  />
                </li>
              );
            })}
          </Dropdown>
        </div>
        <ItemsTable {...props} />
      </React.Fragment>
    );
  }
}

export default Items;

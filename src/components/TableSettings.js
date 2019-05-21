import React from 'react';
import Dropdown from './utils/Dropdown';
import Checkbox from './utils/Checkbox';
import SettingsIcon from '@material-ui/icons/Settings';
import { connect } from 'react-redux';
import { toggleColumn } from '../store/actions/app';

const mapsStateToProps = state => ({
  availableColumns: state.app.config.available_columns,
  activeColumns: state.app.activeColumns,
});

const mapDispatchToProps = dispatch => ({
  toggleColumn: (id, toggle) => {
    dispatch(toggleColumn(id, toggle));
  },
});

function TableSettings(props) {
  return (
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
  );
}

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(TableSettings);

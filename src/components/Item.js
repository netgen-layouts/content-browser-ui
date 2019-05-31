import React from 'react';
import Button from './utils/Button';
import Checkbox from './utils/Checkbox';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import S from './ItemsTable.module.css';
import { connect } from 'react-redux';
import { setSelectedItem } from '../store/actions/app';

const mapsStateToProps = state => ({
  selectedItems: state.app.selectedItems,
  max_selected: parseInt(state.app.config.max_selected, 10),
  disabledItems: state.app.disabledItems,
});

const mapDispatchToProps = dispatch => ({
  setSelectedItem: (id, checked) => {
    dispatch(setSelectedItem(id, checked));
  },
});

function Item(props) {
  const { item } = props;
  const isItemDisabled = props.disabledItems.indexOf(item.value) > -1;
  const isChecked = isItemDisabled || props.selectedItems.findIndex(selectedItem => selectedItem.value === item.value) > -1;
  const isDisabled = isItemDisabled || (!isChecked && props.max_selected !== 0 && props.max_selected > 1 && props.selectedItems.length >= props.max_selected);
  return (
    <tr onClick={() => {if (item.value) props.setPreviewItem(item.value)}} className={props.previewItem === item.value ? S.activeRow : undefined}>
      <td>
        <span className={S.checkbox}>
          <Checkbox
            name="choose-item"
            id={`item-${item.value}`}
            onChange={(e) => props.setSelectedItem(item, e.target.checked)}
            checked={isChecked}
            disabled={isDisabled}
          />
        </span>
        {!item.visible && <span className={S.invisibleIcon}><VisibilityOffIcon fontSize="inherit" /></span>}
        {item.has_sub_items && props.setId ? <Button variant="link" onClick={() => props.setId(item.location_id)}>{item.name}</Button> : <span>{item.name}</span>}
      </td>
      {props.columns.map((column) => {
        if (column.id === 'name') return false;
        return <td key={`${column.id}-${item.value}`} dangerouslySetInnerHTML={{__html: item.columns[column.id]}}></td>;
      })}
    </tr>
  );
}

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(Item);

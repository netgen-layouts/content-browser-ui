import React from 'react';
import Button from './utils/Button';
import Checkbox from './utils/Checkbox';
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
  const isItemDisabled = props.disabledItems.indexOf(props.item.value) > -1;
  const isChecked = isItemDisabled || props.selectedItems.findIndex(selectedItem => selectedItem.value === props.item.value) > -1;
  const isDisabled = isItemDisabled || (!isChecked && props.max_selected !== 0 && props.max_selected > 1 && props.selectedItems.length >= props.max_selected);
  return (
    <tr onClick={() => {if (props.item.value) props.setPreviewItem(props.item.value)}}>
      <td>
        <span className={S.checkbox}>
          <Checkbox
            name="choose-item"
            id={`item-${props.item.value}`}
            onChange={(e) => props.setSelectedItem(props.item, e.target.checked)}
            checked={isChecked}
            disabled={isDisabled}
          />
        </span>
        {props.item.has_sub_items && props.setId ? <Button variant="link" onClick={() => props.setId(props.item.value)}>{props.item.name}</Button> : <span>{props.item.name}</span>}
      </td>
      {props.columns.map((column) => {
        if (column.id === 'name') return false;
        return <td key={`${column.id}-${props.item.value}`} dangerouslySetInnerHTML={{__html: props.item.columns[column.id]}}></td>;
      })}
    </tr>
  );
}

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(Item);

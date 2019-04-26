import React from 'react';
import Button from './utils/Button';
import Checkbox from './utils/Checkbox';
import S from './Items.module.css';
import { connect } from 'react-redux';
import { setSelectedItem } from '../store/actions/app';

const mapsStateToProps = state => ({
  selectedItems: state.app.selectedItems,
  max_selected: state.app.max_selected,
});

const mapDispatchToProps = dispatch => ({
  setSelectedItem: (id, checked) => {
    dispatch(setSelectedItem(id, checked));
  },
});

function Item(props) {
  const isChecked = props.selectedItems.findIndex(selectedItem => selectedItem.value === props.item.value) > -1;
  const isDisabled = !isChecked && props.max_selected > 1 && props.selectedItems.length >= props.max_selected;
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

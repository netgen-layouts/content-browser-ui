import React from 'react';
import Button from './utils/Button';
import Checkbox from './utils/Checkbox';
import S from './Items.module.css';

function Item({ item, setLocationId, columns, setSelectedItems, selectedItems, max_selected, setPreviewItem }) {
  const isChecked = selectedItems.findIndex(selectedItem => selectedItem.value === item.value) > -1;
  const isDisabled = !isChecked && max_selected > 1 && selectedItems.length >= max_selected;
  return (
    <tr onClick={() => {if (item.value) setPreviewItem(item.value)}}>
      <td>
        <span className={S.checkbox}>
          <Checkbox
            name="choose-item"
            id={`item-${item.value}`}
            onChange={(e) => setSelectedItems(item, e.target.checked)}
            checked={isChecked}
            disabled={isDisabled}
          />
        </span>
        {item.has_sub_items && setLocationId ? <Button variant="link" onClick={() => setLocationId(item.value)}>{item.name}</Button> : <span>{item.name}</span>}
      </td>
      {columns.map((column) => {
        if (column.id === 'name') return false;
        return <td key={`${column.id}-${item.value}`} dangerouslySetInnerHTML={{__html: item.columns[column.id]}}></td>;
      })}
    </tr>
  );
}

export default Item;

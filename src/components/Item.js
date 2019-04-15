import React from 'react';
import Button from './utils/Button';
import Checkbox from './utils/Checkbox';

function Item({ item, setLocationId, columns, setSelectedItems, selectedItems, max_selected }) {
  const isChecked = selectedItems.findIndex(selectedItem => selectedItem.location_id === item.location_id) > -1;
  const isDisabled = !isChecked && max_selected > 1 && selectedItems.length >= max_selected;
  return (
    <tr>
      <td>
        <Checkbox
          name="choose-item"
          id={`item-${item.location_id}`}
          onChange={(e) => setSelectedItems(item, e.target.checked)}
          checked={isChecked}
          iconSize={18}
          disabled={isDisabled}
        />
        {item.has_sub_items && setLocationId ? <Button variant="link" onClick={() => setLocationId(item.location_id)}>{item.name}</Button> : <span>{item.name}</span>}
      </td>
      {columns.map((column) => {
        if (column.id === 'name') return false;
        return <td key={`${column.id}-${item.location_id}`} dangerouslySetInnerHTML={{__html: item.columns[column.id]}}></td>;
      })}
    </tr>
  );
}

export default Item;

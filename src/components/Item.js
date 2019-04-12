import React from 'react';
import Button from './utils/Button';

function Item({ item, setLocationId, columns }) {
  return (
    <tr>
      <td>
        {item.has_sub_items ? <Button variant="link" onClick={() => setLocationId(item.location_id)}>{item.name}</Button> : <span>{item.name}</span>}
      </td>
      {columns.map((column) => {
        if (column.id === 'name') return false;
        return <td key={`${column.id}-${item.location_id}`} dangerouslySetInnerHTML={{__html: item.columns[column.id]}}></td>;
      })}
    </tr>
  );
}

export default Item;

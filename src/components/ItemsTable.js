import React from 'react';
import Item from './Item';
import S from './Items.module.css';

function ItemsTable({ items, isLoading, parentLocation, activeColumns, availableColumns, setLocationId, selectedItems, setSelectedItems, max_selected }) {
  const visibleColumns = availableColumns.filter(column => activeColumns.includes(column.id));

  if (!items) {
    return '';
  } else if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <table className={S.table}>
        <thead>
          <tr>
            {visibleColumns.map((column) => <th key={`column-${column.id}`}>{column.name}</th>)}
          </tr>
          <Item
            item={parentLocation}
            columns={visibleColumns}
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
            max_selected={max_selected}
          />
        </thead>
        <tbody>
          {items.map(child => (
            <Item
              key={`locationItem-${child.location_id}`}
              item={child}
              setLocationId={setLocationId}
              columns={visibleColumns}
              setSelectedItems={setSelectedItems}
              selectedItems={selectedItems}
              max_selected={max_selected}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default ItemsTable;

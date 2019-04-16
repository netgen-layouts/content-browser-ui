import React from 'react';
import Item from './Item';
import S from './Items.module.css';

function ItemsTable({ items, activeColumns, availableColumns, setLocationId, selectedItems, setSelectedItems, max_selected, setPreviewItem }) {
  const visibleColumns = availableColumns.filter(column => activeColumns.includes(column.id));

  if (!items.children) {
    return '';
  } else {
    return (
      <table className={S.table}>
        <thead>
          <tr>
            {visibleColumns.map((column) => <th key={`column-${column.id}`}>{column.name}</th>)}
          </tr>
          <Item
            item={items.parent}
            columns={visibleColumns}
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
            max_selected={max_selected}
            setPreviewItem={setPreviewItem}
          />
        </thead>
        <tbody>
          {items.children.map(child => (
            <Item
              key={`locationItem-${child.value}`}
              item={child}
              setLocationId={setLocationId}
              columns={visibleColumns}
              setSelectedItems={setSelectedItems}
              selectedItems={selectedItems}
              max_selected={max_selected}
              setPreviewItem={setPreviewItem}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default ItemsTable;

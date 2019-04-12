import React from 'react';
import Item from './Item';
import S from './Items.module.css';

function ItemsTable({ items, isLoading, parentLocation, activeColumns, availableColumns, setLocationId }) {
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
          <tr>
            <td>{parentLocation.name}</td>
            {visibleColumns.map((column) => {
              if (column.id === 'name') return false;
              return <td key={`${column.id}-${parentLocation.location_id}`} dangerouslySetInnerHTML={{__html: parentLocation.columns[column.id]}}></td>;
            })}
          </tr>
        </thead>
        <tbody>
          {items.map(child => (
            <Item
              key={`locationItem-${child.location_id}`}
              item={child}
              setLocationId={setLocationId}
              columns={visibleColumns}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default ItemsTable;

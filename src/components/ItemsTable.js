import React from 'react';
import Item from './Item';
import Pager from './utils/Pager';
import S from './Items.module.css';

const calculatePages = (total, limit) => {
  const totalPages = parseInt(total / limit, 10);
  return (total % limit) === 0 ? totalPages : totalPages + 1;
}

function ItemsTable(props) {
  const visibleColumns = props.availableColumns.filter(column => props.activeColumns.includes(column.id));

  if (!props.items.children) {
    return '';
  } else {
    return (
      <React.Fragment>
        <table className={S.table}>
          <thead>
            <tr>
              {visibleColumns.map((column) => <th key={`column-${column.id}`}>{column.name}</th>)}
            </tr>
            {props.showParentItem && <Item
                item={props.items.parent}
                columns={visibleColumns}
                setSelectedItems={props.setSelectedItems}
                selectedItems={props.selectedItems}
                max_selected={props.max_selected}
                setPreviewItem={props.setPreviewItem}
              />
            }
          </thead>
          <tbody>
            {props.items.children.map(child => (
              <Item
                key={`locationItem-${child.value}`}
                item={child}
                setLocationId={props.setLocationId}
                columns={visibleColumns}
                setSelectedItems={props.setSelectedItems}
                selectedItems={props.selectedItems}
                max_selected={props.max_selected}
                setPreviewItem={props.setPreviewItem}
              />
            ))}
          </tbody>
        </table>
        <Pager
          setItemsLimit={props.setItemsLimit}
          itemsLimit={props.itemsLimit}
          pages={calculatePages(props.items.children_count, props.itemsLimit)}
          setPage={props.setPage}
          currentPage={props.currentPage}
        />
      </React.Fragment>
    );
  }
}

export default ItemsTable;

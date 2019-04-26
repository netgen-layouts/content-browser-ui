import React from 'react';
import Item from './Item';
import Pager from './utils/Pager';
import S from './Items.module.css';

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
                setPreviewItem={props.setPreviewItem}
              />
            }
          </thead>
          <tbody>
            {props.items.children.map(child => (
              <Item
                key={`locationItem-${child.value}`}
                item={child}
                setId={props.setId}
                setPreviewItem={props.setPreviewItem}
              />
            ))}
          </tbody>
        </table>
        <Pager
          itemsNr={props.items.children_count}
          setPage={props.setPage}
          currentPage={props.currentPage}
        />
      </React.Fragment>
    );
  }
}

export default ItemsTable;

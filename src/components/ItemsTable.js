import React from 'react';
import Item from './Item';
import Pager from './utils/Pager';
import S from './ItemsTable.module.css';

function ItemsTable(props) {
  const visibleColumns = props.availableColumns.filter(column => props.activeColumns.includes(column.id));
  const showParent = props.showParentItem && !!props.items.parent.value;

  let className = S.table;
  if (showParent) className += ` ${S.indent}`;

  if (!props.items.children) {
    return '';
  } else {
    return (
      <React.Fragment>
        <table className={className}>
          <thead>
            <tr>
              {visibleColumns.map((column) => <th key={`column-${column.id}`}>{column.name}</th>)}
            </tr>
            {showParent && <Item
                item={props.items.parent}
                setPreviewItem={props.setPreviewItem}
                columns={visibleColumns}
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
                columns={visibleColumns}
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

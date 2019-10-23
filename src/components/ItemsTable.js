import React from 'react';
import { connect } from 'react-redux';
import Item from './Item';
import Pager from './utils/Pager';
import S from './ItemsTable.module.css';

const mapsStateToProps = state => ({
  availableColumns: state.app.config.available_columns,
  activeColumns: state.app.activeColumns,
});

function ItemsTable(props) {
  const visibleColumns = props.availableColumns.filter(column => props.activeColumns.includes(column.id));
  const showParent = props.showParentItem && !!props.items.parent.value;

  let className = S.table;
  if (showParent) className += ` ${S.indent}`;

  if (!props.items.children) {
    return '';
  } else {
    return (
      <>
        <table className={className} data-cy="items-table">
          <thead data-cy="items-table-head">
            <tr>
              {visibleColumns.map((column) => <th key={`column-${column.id}`}>{column.name}</th>)}
            </tr>
            {showParent && <Item
                item={props.items.parent}
                setPreviewItem={props.setPreviewItem}
                columns={visibleColumns}
                previewItem={props.previewItem}
              />
            }
          </thead>
          <tbody data-cy="items-table-body">
            {props.items.children.map(child => (
              <Item
                key={`locationItem-${child.value}`}
                item={child}
                setId={props.setId}
                setPreviewItem={props.setPreviewItem}
                columns={visibleColumns}
                previewItem={props.previewItem}
              />
            ))}
          </tbody>
        </table>
        <Pager
          itemsNr={props.items.children_count}
          setPage={props.setPage}
          currentPage={props.currentPage}
        />
      </>
    );
  }
}

export default connect(
  mapsStateToProps,
)(ItemsTable);

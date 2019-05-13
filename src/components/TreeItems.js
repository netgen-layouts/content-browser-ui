import React from 'react';
import TreeItem from './TreeItem';
import S from './Tree.module.css';

function TreeItems(props) {
  return (
    <ul className={S.tree}>
      {props.items.map(child => (
        <TreeItem
          item={child}
          setLocationId={props.setLocationId}
          key={`treeItem-${child.id}`}
          isActive={child.id === props.locationId}
          locationId={props.locationId}
        />
      ))}
    </ul>
  );
}

export default TreeItems;

import React from 'react';
import TreeItem from './TreeItem';
import Loader from './utils/Loader';
import S from './Tree.module.css';

function Tree(props) {
  if (!props.items) {
    return '';
  } else if (props.isLoading) {
    return <Loader />;
  } else {
    return (
      <ul className={S.tree}>
        {props.items.map(child => (
          <TreeItem
            item={child}
            onClick={props.onChangeLocation}
            key={`treeItem-${child.id}`}
            isActive={child.id === props.locationId}
          />
        ))}
      </ul>
    );
  }
}

export default Tree;

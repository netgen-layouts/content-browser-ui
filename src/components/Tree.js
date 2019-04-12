import React from 'react';
import TreeItem from './TreeItem';
import Loader from './utils/Loader';

function Tree(props) {
  if (!props.items) {
    return '';
  } else if (props.isLoading) {
    return <Loader />;
  } else {
    return (
      <ul>
        {props.items.map(child => <TreeItem data={child} handleClick={props.onChangeLocation} key={`treeItem-${child.id}`} />)}
      </ul>
    );
  }
}

export default Tree;

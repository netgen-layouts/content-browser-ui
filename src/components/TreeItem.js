import React from 'react';

function TreeItem(props) {
  return (
    <li>
      <button onClick={() => props.handleClick(props.data.id)}>{props.data.name}</button>
    </li>
  );
}

export default TreeItem;

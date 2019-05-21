import React from 'react';
import S from './Tabs.module.css';

function Tab(props) {
  let className = S.tab;
  if (props.isActive) className += ` ${S.active}`;
  return (
    <li className={className} onClick={props.onClick}>
      {props.icon ? props.icon : ''}{props.label}
    </li>
  );
}

export default Tab;

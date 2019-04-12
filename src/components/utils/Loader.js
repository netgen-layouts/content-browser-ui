import React from 'react';
import S from './Loader.module.css';

function Loader(props) {
  return (
    <div className={S.loader}>
      <div className={S.content}>
        <i className={S.icon}></i>
        <span>Loading</span>
      </div>
    </div>
  );
}

export default Loader;

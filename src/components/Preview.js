import React from 'react';
import Loader from './utils/Loader';
import S from './Preview.module.css';

function Preview(props) {
  if (props.isLoading) {
    return <div className={S.preview}><Loader/></div>
  } else {
    return (
      <div className={S.preview} dangerouslySetInnerHTML={{__html: props.preview}}></div>
    );
  }
}

export default Preview;

import React from 'react';
import Loader from './utils/Loader';
import S from './Preview.module.css';

function Preview(props) {
  if (props.isLoading) {
    return <div className={S.preview}><Loader/></div>
  } else if (props.preview === null) {
    return (
      <div className={S.preview}><div className={S.content}>This item does not have a preview.</div></div>
    );
  } else {
    return (
      <div className={S.preview}><div className={S.content} dangerouslySetInnerHTML={{__html: props.preview}}></div></div>
    );
  }
}

export default Preview;

import React from 'react';
import Loader from './utils/Loader';
import S from './Preview.module.css';
import { connect } from 'react-redux';

const mapsStateToProps = state => ({
  previews: state.app.previews,
});

function Preview(props) {
  if (props.isLoading) {
    return <div className={S.preview}><Loader/></div>
  } else if (props.previewItem === null) {
    return (
      <div className={S.preview}><div className={S.content}>This item does not have a preview.</div></div>
    );
  } else {
    return (
      <div className={S.preview}><div className={S.content} dangerouslySetInnerHTML={{__html: props.previews[props.previewItem]}}></div></div>
    );
  }
}

export default connect(
  mapsStateToProps,
)(Preview);

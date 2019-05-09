import React, { useEffect } from 'react';
import Loader from './utils/Loader';
import { CSSTransition } from 'react-transition-group';
import S from './Preview.module.css';
import { connect } from 'react-redux';
import { fetchPreview } from '../store/actions/app';

const mapsStateToProps = state => ({
  previews: state.app.previews,
  showPreview: state.app.showPreview,
  isLoading: state.app.isPreviewLoading,
  has_preview: state.app.config.has_preview,
});

const mapDispatchToProps = dispatch => ({
  fetchPreview: (id) => {
    dispatch(fetchPreview(id));
  },
});

function PreviewContent(props) {
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

function Preview(props) {
  useEffect(() => {
    if (props.showPreview && props.previewItem) props.fetchPreview(props.previewItem);
  }, [props.previewItem, props.showPreview]);

  if (!props.has_preview) return null;
  return (
    <CSSTransition
      in={props.showPreview}
      unmountOnExit
      timeout={250}
      classNames={{
        enter: S.slideEnter,
        enterActive: S.slideActiveEnter,
        exit: S.slideExit,
        exitActive: S.slideActiveExit,
      }}
    >
      <PreviewContent {...props} />
    </CSSTransition>
  )
}

export default connect(
  mapsStateToProps,
  mapDispatchToProps,
)(Preview);

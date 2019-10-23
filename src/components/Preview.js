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
    return <Loader/>
  } else if (props.previewItem === null) {
    return (
      <div className={S.content}>This item does not have a preview.</div>
    );
  } else {
    return (
      <div className={S.content} dangerouslySetInnerHTML={{__html: props.previews[props.previewItem]}}></div>
    );
  }
}

function Preview(props) {
  const {showPreview, previewItem, fetchPreview} = props;
  useEffect(() => {
    if (showPreview && previewItem) fetchPreview(previewItem);
  }, [previewItem, showPreview, fetchPreview]);

  if (!props.has_preview) return null;
  return (
    <CSSTransition
      in={showPreview}
      unmountOnExit
      timeout={250}
      classNames={{
        enter: S.slideEnter,
        enterActive: S.slideActiveEnter,
        exit: S.slideExit,
        exitActive: S.slideActiveExit,
      }}
    >
      <div className={S.preview} data-cy="preview">
        <PreviewContent {...props} />
      </div>
    </CSSTransition>
  )
}

export default connect(
  mapsStateToProps,
  mapDispatchToProps,
)(Preview);

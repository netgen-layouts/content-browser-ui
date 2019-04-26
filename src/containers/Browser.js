import { connect } from 'react-redux';
import { fetchConfig } from '../store/actions/app';
import Browser from '../components/Browser';

const mapsStateToProps = state => ({
  isLoaded: state.app.isLoaded,
  config: state.app.config,
  showPreview: state.app.showPreview,
  isPreviewLoading: state.items.isPreviewLoading,
  previewItem: state.items.previewItem,
});

const mapDispatchToProps = dispatch => ({
  fetchConfig: () => {
    dispatch(fetchConfig());
  },
});

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(Browser);

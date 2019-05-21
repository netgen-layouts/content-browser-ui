import { connect } from 'react-redux';
import Browser from '../components/Browser';

const mapsStateToProps = state => ({
  isLoaded: state.app.isLoaded,
  config: state.app.config,
  onCancel: state.app.onCancel,
});

export default connect(
  mapsStateToProps,
)(Browser);

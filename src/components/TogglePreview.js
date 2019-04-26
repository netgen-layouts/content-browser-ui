import React from 'react';
import Toggle from './utils/Toggle';
import { connect } from 'react-redux';
import { togglePreview } from '../store/actions/app';

const mapsStateToProps = state => ({
  showPreview: state.app.showPreview,
});

const mapDispatchToProps = dispatch => ({
  togglePreview: (id, toggle) => {
    dispatch(togglePreview(id, toggle));
  },
});

function TogglePreview(props) {
  return (
    <Toggle
      name="togglePreview"
      id="togglePreview"
      onChange={(e) => props.togglePreview(e.target.checked)}
      checked={props.showPreview}
      label="Preview"
    />
  );
}

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(TogglePreview);

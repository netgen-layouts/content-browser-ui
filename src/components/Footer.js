import React from 'react';
import Button from './utils/Button';
import FooterItem from './FooterItem';
import S from './Footer.module.css';
import { connect } from 'react-redux';
import { setSelectedItem } from '../store/actions/app';

const mapsStateToProps = state => ({
  selectedItems: state.app.selectedItems,
  min_selected: state.app.min_selected,
  onCancel: state.app.onCancel,
  onConfirm: state.app.onConfirm,
});

const mapDispatchToProps = dispatch => ({
  setSelectedItem: (id, toggle) => {
    dispatch(setSelectedItem(id, toggle));
  },
});

function Footer(props) {
  return (
    <div className={S.footer}>
      <div className={S.items}>
        {props.selectedItems.map(item => <FooterItem key={`item-${item.value}`} item={item} onClick={() => props.setSelectedItem(item, false)} />)}
      </div>
      <div className={S.actions}>
        <Button variant="cancel" onClick={props.onCancel}>Cancel</Button>
        <Button variant="primary" disabled={props.selectedItems.length < props.min_selected} onClick={() => props.onConfirm(props.selectedItems)}>Confirm</Button>
      </div>
    </div>
  );
}

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(Footer);

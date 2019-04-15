import React from 'react';
import Button from './utils/Button';
import FooterItem from './FooterItem';
import S from './Footer.module.css';

function Footer(props) {
  return (
    <div className={S.footer}>
      <div className={S.items}>
        {props.selectedItems.map(item => <FooterItem key={`item-${item.location_id}`} item={item} onClick={() => props.setSelectedItems(item, false)} />)}
      </div>
      <div className={S.actions}>
        <Button variant="cancel">Cancel</Button>
        <Button variant="primary" disabled={props.selectedItems.length < props.min_selected}>Confirm</Button>
      </div>
    </div>
  );
}

export default Footer;

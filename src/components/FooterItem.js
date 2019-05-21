import React from 'react';
import Button from './utils/Button';
import ClearIcon from '@material-ui/icons/Clear';
import S from './Footer.module.css';

function FooterItem({ item, onClick }) {
  return (
    <Button variant="default" onClick={onClick}>
      {item.name}
      <span className={S.itemIcon}>
        <ClearIcon fontSize="inherit" color="inherit" />
      </span>
    </Button>
  );
}

export default FooterItem;

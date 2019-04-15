import React from 'react';
import Button from './utils/Button';
import FolderIcon from '@material-ui/icons/Folder';
import S from './Tree.module.css';

function TreeItem({ item, onClick }) {
  return (
    <li>
      <Button variant="primary" onClick={() => onClick(item.id)} className={S.button}>
        <div className={S.icon}>
          <FolderIcon color="inherit" fontSize="inherit" />
        </div>
        {item.name}
      </Button>
    </li>
  );
}

export default TreeItem;

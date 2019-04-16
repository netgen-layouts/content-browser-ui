import React from 'react';
import Button from './utils/Button';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import S from './Tree.module.css';

function TreeItem({ item, onClick, isActive }) {
  return (
    <li>
      <Button variant="primary" onClick={() => onClick(item.id)} className={`${S.button}${isActive ? ` ${S.active}` : ''}`}>
        <div className={S.icon}>
          {item.has_sub_items ? <FolderIcon color="inherit" fontSize="inherit" /> : <FolderOpenIcon color="inherit" fontSize="inherit" />}
        </div>
        {item.name}
      </Button>
    </li>
  );
}

export default TreeItem;

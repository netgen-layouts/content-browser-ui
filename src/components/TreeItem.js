import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { buildUrl } from '../helpers';
import Button from './utils/Button';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import AddBoxIcon from '@material-ui/icons/AddBox';
import LoopIcon from '@material-ui/icons/Loop';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import TreeItems from './TreeItems';
import S from './Tree.module.css';

const mapsStateToProps = state => ({
  customParams: state.app.customParams,
  itemType: state.app.itemType,
});

const iconNames = {
  normal: FolderIcon,
  empty: FolderOpenIcon,
  loading: LoopIcon,
  open: IndeterminateCheckBoxIcon,
  closed: AddBoxIcon,
};

function TreeItem(props) {
  const { item, isActive } = props;
  const [showSubItems, setShowSubItems] = useState(false);
  const [subItems, setSubItems] = useState([]);
  const [isLoadingSubItems, setIsLoadingSubItems] = useState(false);

  useEffect(() => {
    if (showSubItems && !subItems.length) fetchSubItems();
  }, [showSubItems]);

  const fetchSubItems = () => {
    setIsLoadingSubItems(true);
    const url = buildUrl(() => ({
      app: {
        customParams: props.customParams,
        itemType: props.itemType,
      },
    }), `browse/${item.id}/locations`);
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setSubItems(result.children);
          setIsLoadingSubItems(false);
        },
      )
  }

  const handleToggleSubtree = (e) => {
    e.preventDefault();
    if (!item.has_sub_locations) return;
    e.stopPropagation();
    setShowSubItems(!showSubItems);
  };

  let iconClassName = S.icon;
  let icon = item.has_sub_items ? 'normal' : 'empty';
  if (item.has_sub_locations) {
    icon = showSubItems ? 'open' : 'closed';
    iconClassName += ` ${S.hasItems}`;
  }
  if (isLoadingSubItems) {
    icon = 'loading';
    iconClassName += ` ${S.rotate}`;
  }
  const IconTag = iconNames[icon]
  const getIcon = () => <IconTag fontSize="inherit" onClick={handleToggleSubtree} />;

  return (
    <li className={S.item}>
      <Button variant="primary" onClick={() => props.setLocationId(item.id)} className={`${S.button}${isActive ? ` ${S.active}` : ''}`}>
        <div className={iconClassName}>
          {getIcon()}
        </div>
        {item.name}
      </Button>
      {showSubItems && !isLoadingSubItems && !!subItems.length &&
        <TreeItems
          items={subItems}
          setLocationId={props.setLocationId}
          locationId={props.locationId}
        />}
    </li>
  );
}

export default connect(
  mapsStateToProps,
)(TreeItem);

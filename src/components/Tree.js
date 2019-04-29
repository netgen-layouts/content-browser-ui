import React from 'react';
import TreeItem from './TreeItem';
import Loader from './utils/Loader';
import Select from './utils/Select';
import S from './Tree.module.css';

function Tree(props) {
  return (
    <React.Fragment>
      <Select
        options={props.sections.map(section => ({value: section.id, label: section.name}))}
        onChange={props.setSectionId}
        value={props.id.toString()}
      />
      <div className={S.wrapper}>
        {props.isLoading
          ? <Loader />
          : <ul className={S.tree}>
            {props.items.map(child => (
              <TreeItem
                item={child}
                onClick={props.setLocationId}
                key={`treeItem-${child.id}`}
                isActive={child.id === props.locationId}
              />
            ))}
          </ul>
        }
      </div>
    </React.Fragment>
  );
}

export default Tree;

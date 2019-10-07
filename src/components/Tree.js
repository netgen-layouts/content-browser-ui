import React from 'react';
import TreeItems from './TreeItems';
import Loader from './utils/Loader';
import Select from './utils/Select';
import S from './Tree.module.css';

function Tree(props) {
  return (
    <>
      <Select
        options={props.sections.map(section => ({value: section.id, label: section.name}))}
        onChange={props.setSectionId}
        value={props.id.toString()}
      />
      <div className={S.wrapper}>
        {props.isLoading
          ? <Loader />
          : <TreeItems
              items={props.items}
              setLocationId={props.setLocationId}
              locationId={props.locationId}
            />
        }
      </div>
    </>
  );
}

export default Tree;

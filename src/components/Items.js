import React from 'react';
import { CSSTransition } from 'react-transition-group';
import ItemsTable from './ItemsTable';
import Breadcrumbs from './Breadcrumbs';
import TableSettings from './TableSettings';
import Loader from './utils/Loader';
import S from './Items.module.css';

function Items(props) {
  if (!props.items) {
    return '';
  } else if (props.isLoading) {
    return <Loader />;
  } else {
    return (
      <CSSTransition
        in
        appear
        timeout={200}
        classNames={{
          appear: S.fadeEnter,
          appearActive: S.fadeActiveEnter,
          appearDone: S.fadeActiveDone,
          enterDone: S.fadeEnterDone,
          exit: S.fadeExit,
          exitActive: S.fadeActiveExit,
        }}
      >
        <div>
          <div className={S.header}>
            <Breadcrumbs items={props.items.path} setId={props.setId} />
            <TableSettings />
          </div>
          <ItemsTable {...props} showParentItem={true} />
        </div>
      </CSSTransition>
    );
  }
}

export default Items;

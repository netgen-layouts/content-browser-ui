import React from 'react';
import { CSSTransition } from 'react-transition-group';
import S from './Loader.module.css';

function Loader(props) {
  return (
    <CSSTransition
      in
      appear
      timeout={250}
      classNames={{
        appear: S.fadeEnter,
        appearActive: S.fadeActiveEnter,
        appearDone: S.fadeActiveDone,
        enterDone: S.fadeEnterDone,
        exit: S.fadeExit,
        exitActive: S.fadeActiveExit,
      }}
    >
      <div className={S.loader}>
        <div className={S.content}>
          <i className={S.icon}></i>
          <span>Loading</span>
        </div>
      </div>
    </CSSTransition>
  );
}

export default Loader;

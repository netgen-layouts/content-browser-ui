import React from 'react';
import S from './Button.module.css';

function Button({ variant = 'primary', onClick, children = '' }) {
  const className = `${S.button} ${S[variant]}`;
  return <button className={className} onClick={onClick}>{children}</button>;
}

export default Button;

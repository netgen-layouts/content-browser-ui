import React from 'react';
import S from './Button.module.css';

function Button({ variant = 'primary', onClick, children = '', className, disabled = false }) {
  const defaultClassName = className || `${S.button} ${S[variant]}`;
  return <button className={defaultClassName} onClick={onClick} disabled={disabled}>{children}</button>;
}

export default Button;

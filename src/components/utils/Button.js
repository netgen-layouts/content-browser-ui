import React from 'react';
import S from './Button.module.css';

function Button({ variant = 'primary', onClick, children = '', className, disabled = false, type = 'button', prefixed, sufixed }) {
  let defaultClassName = className || `${S.button} ${S[variant]}`;
  if (prefixed) defaultClassName += ` ${S.prefixed}`;
  if (sufixed) defaultClassName += ` ${S.sufixed}`;
  return <button className={defaultClassName} onClick={onClick} disabled={disabled} type={type}>{children}</button>;
}

export default Button;

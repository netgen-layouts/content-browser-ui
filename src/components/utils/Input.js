import React from 'react';
import S from './Input.module.css';

function Input({ onChange, value, name, id, label, type = 'text', disabled, placeholder, prefixed, sufixed}) {
  let className = `${S.input}`;
  if (prefixed) className += ` ${S.prefixed}`;
  if (sufixed) className += ` ${S.sufixed}`;
  return (
    <>
      {label && <label htmlFor={id} className={disabled ? S.disabledLabel : S.label}>
          {label}
        </label>
      }
      <input
        name={name}
        id={id}
        type={type}
        onChange={onChange}
        className={className}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
      />
    </>
  );
}

export default Input;

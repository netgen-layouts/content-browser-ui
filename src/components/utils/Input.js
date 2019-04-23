import React from 'react';
import S from './Input.module.css';

function Input({ onChange, value, name, id, label, type = 'text', disabled, placeholder}) {
  return (
    <React.Fragment>
      {label && <label htmlFor={id} className={disabled ? S.disabledLabel : S.label}>
          {label}
        </label>
      }
      <input name={name} id={id} type={type} onChange={onChange} className={S.input} disabled={disabled} placeholder={placeholder} value={value} />
    </React.Fragment>
  );
}

export default Input;

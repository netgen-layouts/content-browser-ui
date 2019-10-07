import React from 'react';
import S from './Toggle.module.css';

function Toggle({ onChange, checked, name, id, label, disabled }) {
  return (
    <>
      <input name={name} id={id} type="checkbox" onChange={onChange} checked={checked} className={S.checkbox} disabled={disabled} />
      <label htmlFor={id} className={disabled ? S.disabledLabel : S.label}>
        {label}
        <span className={checked ? S.iconActive : S.icon}></span>
      </label>
    </>
  );
}

export default Toggle;

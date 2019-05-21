import React from 'react';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import S from './Checkbox.module.css';

function Checkbox({ onChange, checked, name, id, label, disabled }) {
  return (
    <React.Fragment>
      <input name={name} id={id} type="checkbox" onChange={onChange} checked={checked} className={S.checkbox} disabled={disabled} />
      <label htmlFor={id} className={disabled ? S.disabledLabel : S.label}>
        <span className={checked ? S.iconActive : S.icon}>
          {checked ? <CheckBoxIcon color="inherit" fontSize="inherit" /> : <CheckBoxOutlineBlankIcon color="inherit" fontSize="inherit" />}
        </span>
        {label}
      </label>
    </React.Fragment>
  );
}

export default Checkbox;

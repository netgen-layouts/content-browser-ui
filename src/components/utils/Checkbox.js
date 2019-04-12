import React, { useState } from 'react';

function Checkbox({ onChange, checked, name, id, label }) {
  const [isChecked, setIsChecked] = useState(checked || false);

  const handleChange = (e) => {
    setIsChecked(!isChecked);
    if (onChange) onChange(e);
  }

  return (
    <React.Fragment>
      <input name={name} id={id} type="checkbox" onChange={handleChange} checked={isChecked} />
      <label htmlFor={id}>{label}</label>
    </React.Fragment>
  );
}

export default Checkbox;

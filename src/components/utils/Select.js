import React, { useState } from 'react';
import S from './Select.module.css';

function Select({ options = [], onChange, value }) {
  const [selectedValue, setSelectedValue] = useState(value || null);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (onChange) onChange(event.target.value);
  }

  return (
    <select value={selectedValue} onChange={handleChange} className={S.select}>
      {options.map(option => <option value={option.value} key={`option-${option.value}`}>{option.label}</option>)}
    </select>
  );
}

export default Select;

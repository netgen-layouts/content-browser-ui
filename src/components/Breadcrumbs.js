import React from 'react';
import Button from './utils/Button';
import S from './Breadcrumbs.module.css';

function Breadcrumbs({ items, setLocationId }) {
  return (
    <ul className={S.breadcrumbs}>
      {items.map((item, i) => (
        <li key={item.name}>
          {i < items.length - 1 ?
            <Button onClick={() => setLocationId(item.id)} variant="link">{item.name}</Button>
            :
            <span>{item.name}</span>
          }
        </li>
      ))}
    </ul>
  );
}

export default Breadcrumbs;

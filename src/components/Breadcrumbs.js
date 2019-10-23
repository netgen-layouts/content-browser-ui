import React from 'react';
import Button from './utils/Button';
import S from './Breadcrumbs.module.css';

function Breadcrumbs({ items, setId }) {
  if (!items) {
    return '';
  } else {
    return (
      <ul className={S.breadcrumbs} data-cy="breadcrumbs">
        {items.map((item, i) => (
          <li key={item.name}>
            {i < items.length - 1 ?
              <Button onClick={() => setId(item.id)} variant="link">{item.name}</Button>
              :
              <span>{item.name}</span>
            }
          </li>
        ))}
      </ul>
    );
  }
}

export default Breadcrumbs;

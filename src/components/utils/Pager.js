import React from 'react';
import Select from './Select';
import Button from './Button';
import S from './Pager.module.css';

const limits = [
  {id: 5, name: 5},
  {id: 10, name: 10},
  {id: 25, name: 25},
]

function Pager(props) {
  const getPageButtons = (nr) => {
    const pages = [];
    for (let i = 1; i <= nr; i++) {
      pages.push(
        <li key={`page-${i}`} className={S.paginatorItem}>
          <Button
            variant={i === props.currentPage ? 'primary' : 'transparent'}
            onClick={() => props.setPage(i)}
          >{i}</Button>
        </li>
      );
    }
    return pages;
  }

  return (
    <div className={S.pager}>
      <ul className={S.pagination}>
        {getPageButtons(props.pages)}
      </ul>
      <Select
        options={limits.map(limit => ({value: limit.id, label: limit.name}))}
        onChange={props.setItemsLimit}
        value={props.itemsLimit}
      />
    </div>
  );
}

export default Pager;

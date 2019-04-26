import React from 'react';
import Select from './Select';
import Button from './Button';
import S from './Pager.module.css';
import { connect } from 'react-redux';
import { setItemsLimit } from '../../store/actions/app';

const calculatePages = (total, limit) => {
  const totalPages = parseInt(total / limit, 10);
  return (total % limit) === 0 ? totalPages : totalPages + 1;
}

const mapsStateToProps = state => ({
  limits: state.app.limits,
  itemsLimit: state.app.itemsLimit,
});

const mapDispatchToProps = dispatch => ({
  setItemsLimit: (limit) => {
    dispatch(setItemsLimit(limit));
  },
});

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
        {getPageButtons(calculatePages(props.itemsNr, props.itemsLimit))}
      </ul>
      <Select
        options={props.limits.map(limit => ({value: limit.id, label: limit.name}))}
        onChange={props.setItemsLimit}
        value={props.itemsLimit}
      />
    </div>
  );
}

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(Pager);

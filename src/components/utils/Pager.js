import React from 'react';
import Select from './Select';
import Button from './Button';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import S from './Pager.module.css';
import { connect } from 'react-redux';
import { setItemsLimit } from '../../store/actions/app';

const calculatePages = (total, limit) => {
  if (total === 0) return 1;
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
  const pagesNr = calculatePages(props.itemsNr, props.itemsLimit);
  const getPageButtons = () => {
    const pages = [];
    for (let i = 1; i <= pagesNr; i++) {
      pages.push(
        <li key={`page-${i}`} className={S.paginatorItem}>
          <Button
            variant={i === props.currentPage ? 'primary' : 'transparent'}
            onClick={() => props.currentPage !== i && props.setPage(i)}
          >{i}</Button>
        </li>
      );
    }
    return pages;
  }

  return (
    <div className={S.pager} data-cy="pager">
      <ul className={S.pagination} data-cy="pagination">
        <li className={S.paginatorItem}>
          <Button
            variant={'transparent'}
            disabled={props.currentPage === 1}
            onClick={() => props.setPage(props.currentPage - 1)}
          ><ArrowLeftIcon fontSize="inherit" /></Button>
        </li>
        {getPageButtons()}
        <li className={S.paginatorItem}>
          <Button
            variant={'transparent'}
            disabled={props.currentPage === pagesNr}
            onClick={() => props.setPage(props.currentPage + 1)}
          ><ArrowRightIcon fontSize="inherit" /></Button>
        </li>
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

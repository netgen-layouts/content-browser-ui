import { connect } from 'react-redux';
import { fetchItems, setSearchPage, setPreviewItem } from '../store/actions/search';
import Items from '../components/Items';

const mapsStateToProps = state => ({
  isLoading: state.search.isLoading,
  items: state.search.items,
  currentPage: state.search.currentPage,
  previewItem: state.search.previewItem,
});

const mapDispatchToProps = dispatch => ({
  fetchItems: () => {
    dispatch(fetchItems());
  },
  setPage: (page) => {
    dispatch(setSearchPage(page));
  },
  setPreviewItem: (item) => {
    dispatch(setPreviewItem(item));
  },
});

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(Items);

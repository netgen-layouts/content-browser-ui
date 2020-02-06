import { connect } from 'react-redux';
import { setSearchTerm, fetchItems, setSearchPage, setPreviewItem } from '../store/actions/search';
import Search from '../components/Search';
import {setSectionId} from '../store/actions/app';

const mapsStateToProps = state => ({
  isLoading: state.search.isLoading,
  items: state.search.items,
  searchTerm: state.search.searchTerm,
  currentPage: state.search.currentPage,
  previewItem: state.search.previewItem,
  sections: state.app.config.sections,
  id: state.app.sectionId,
});

const mapDispatchToProps = dispatch => ({
  setSearchTerm: (term) => {
    dispatch(setSearchTerm(term));
  },
  fetchItems: () => {
    dispatch(fetchItems());
  },
  setPage: (page) => {
    dispatch(setSearchPage(page));
  },
  setPreviewItem: (item) => {
    dispatch(setPreviewItem(item));
  },
  setSectionId: (id) => {
    dispatch(setSectionId(id));
  },
});

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(Search);

import { connect } from 'react-redux';
import { fetchLocationItems, setPage, setLocationId, setPreviewItem } from '../store/actions/items';
import Items from '../components/Items';

const mapsStateToProps = state => ({
  isLoading: state.items.isLocationLoading,
  items: state.items.locationItems,
  id: state.items.locationId,
  currentPage: state.items.currentPage,
  previewItem: state.items.previewItem,
});

const mapDispatchToProps = dispatch => ({
  fetchItems: () => {
    dispatch(fetchLocationItems());
  },
  setPage: (page) => {
    dispatch(setPage(page));
  },
  setId: (id) => {
    dispatch(setLocationId(id));
  },
  setPreviewItem: (item) => {
    dispatch(setPreviewItem(item));
  },
});

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(Items);

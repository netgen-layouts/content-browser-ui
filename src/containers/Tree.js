import { connect } from 'react-redux';
import { fetchTreeItems, setLocationId } from '../store/actions/items';
import { setSectionId } from '../store/actions/app';
import Tree from '../components/Tree';

const mapsStateToProps = state => ({
  isLoading: state.items.isTreeLoading,
  items: state.items.treeItems,
  id: state.app.sectionId,
  locationId: state.items.locationId,
  sections: state.app.config.sections,
});

const mapDispatchToProps = dispatch => ({
  fetchItems: () => {
    dispatch(fetchTreeItems());
  },
  setSectionId: (id) => {
    dispatch(setSectionId(id));
  },
  setLocationId: (id) => {
    dispatch(setLocationId(id));
  },
});

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(Tree);

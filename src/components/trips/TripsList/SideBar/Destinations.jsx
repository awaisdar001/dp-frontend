import { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import {
  fetchTripsFromAPI,
  resetAllDestinations,
  selectSidebarDestinations,
  shouldRestDestinationItems,
  updateTripsByDestination,
} from '../../../../store/features/trips';
import DPCheckbox from '../../../common/dpCheckbox';

function Destinations() {
  const destinations = useSelector(selectSidebarDestinations);
  const dispatch = useDispatch();
  const store = useStore();

  const resetAllItems = () => dispatch(resetAllDestinations());
  const refreshTripsResult = () => dispatch(fetchTripsFromAPI());

  const handleChange = (event) => {
    const target = event.target;
    const payload = { value: target.value, selected: target.checked };
    dispatch(updateTripsByDestination(payload));
  };

  const handleResetItems = (event) => {
    event.preventDefault();
    resetAllItems();
  };

  useEffect(() => {
    if (shouldRestDestinationItems(store.getState()) === true) {
      resetAllItems();
    } else {
      refreshTripsResult();
    }
  }, [destinations, dispatch]);

  return (
    <div className="destinations dp-checkbox">
      <span className="title mb-3">Destinations</span>
      {destinations.map((destination) => (
        <DPCheckbox
          key={'destination-' + destination.value}
          value={destination.value}
          name="destination[]"
          label={destination.label}
          selected={destination.selected}
          onChange={handleChange}
        />
      ))}
      <button
        type="submit"
        className="btn btn-success btn-block btn-lg mt-4"
        onClick={handleResetItems}
      >
        RESET
      </button>
    </div>
  );
}

export default Destinations;

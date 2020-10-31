import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadTripFromState,
  selectSidebarDestinations,
  updateTripsByDestination,
} from '../../../../store/features/trips';
import DPCheckbox from '../../../common/dpCheckbox';
function Destinations() {
  console.log('rerendring destiantions. ');
  const destinations = useSelector(selectSidebarDestinations);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const target = event.target;
    const payload = { value: target.value, selected: target.checked };
    dispatch(updateTripsByDestination(payload));
  };

  useEffect(() => {
    console.log('[useEffect]: Trips-API Call here.');
    dispatch(loadTripFromState());
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
    </div>
  );
}

export default Destinations;

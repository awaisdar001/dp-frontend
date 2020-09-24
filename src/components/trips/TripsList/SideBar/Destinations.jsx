import React from "react";
import DPCheckbox from "../../../common/dpCheckbox";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSidebarDestinations,
  updateTripsByDestination,
} from "../../../../store/features/trips";

function Destinations() {
  console.log("rerendring destiantions. ");
  const destinations = useSelector(selectSidebarDestinations);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const target = event.target;
    const payload = { value: target.value, selected: target.checked };
    dispatch(updateTripsByDestination(payload));
  };

  return (
    <div className="destinations dp-checkbox">
      <span className="title mb-3">Destinations</span>
      {destinations.map((destination) => (
        <DPCheckbox
          key={"destination-" + destination.value}
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

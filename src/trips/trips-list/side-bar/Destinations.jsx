import React from 'react';
import {DpCheckbox} from '../../../components/common';

function Destinations({items: destinations, onChange}) {
  console.log('rerendring destiantions. ');

  return (
    <div className="destinations dp-checkbox">
      <span className="title mb-3">Destinations</span>
      {destinations.map((destination) => (
        <DpCheckbox
          key={'destination-' + destination.value}
          value={destination.value}
          name="destination[]"
          label={destination.label}
          selected={destination.selected}
          onChange={(event) => onChange(event, destination.value)}
        />
      ))}
    </div>
  );
}

export default Destinations;

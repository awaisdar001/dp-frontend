import React from 'react';

import {DpCheckbox} from '../../../common';

function Destinations({items: destinations, onChange}) {
  console.log('rerendring destiantions. ');

  return (
    <div className="destinations dp-checkbox">
      <span className="title mb-3">Destinations</span>
      {destinations.map((destination) => (
        <DpCheckbox
          key={'destination-' + destination.slug}
          value={destination.slug}
          name="destination[]"
          label={destination.name}
          selected={destination.selected}
          onChange={(event) => onChange(event, destination.slug)}
        />
      ))}
    </div>
  );
}

export default React.memo(Destinations);

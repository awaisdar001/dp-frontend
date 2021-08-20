import React from 'react';
import TripHeaderItem from './HeaderItem';
import { tripHeaderItems } from '../../data/enums';

function TripHeader() {
  const [activeLink, setActiveLink] = React.useState(tripHeaderItems[0].slug);

  return (
    <TripHeaderItem
      items={tripHeaderItems}
      handleOnClick={(slug, e) => setActiveLink(slug)}
      activeItem={activeLink}
    />
  );
}

export default TripHeader;

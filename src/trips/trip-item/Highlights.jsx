import React from 'react';

import { useModel } from '../../generic/model-store';
import Metadata from '../trips-list/content/Metadata';

export default function TripHighlights({ trip }) {
  const tripCategory = useModel('category', trip.primaryCategory);
  const tripDestination = useModel('location', trip.destination);
  const tripHost = useModel('host', trip.host);

  return (
    <Metadata
      className="mt-2"
      duration={trip.duration}
      hostName={tripHost.name}
      category={tripCategory}
      destination={tripDestination}
    />
  );
}

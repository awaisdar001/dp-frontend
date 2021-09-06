import React from 'react';
import {TripCategories, TripDepartureLocation, TripFacilities, TripGear, TripLocations,} from './index';
import {useModel, useModels} from '../../../generic/model-store';

export default function TripDetails({trip}) {
  const tripDestination = useModel('location', trip.destination);
  const startingLocation = useModel('location', trip.startingLocation);
  const tripLocations = useModels('location', trip.locations);
  const tripFacilities = useModels('facility', trip.facilities);

  return (
    <div id="details" className="trip-details-wrapper wrapper-block">
      <h3 className="h3">Details</h3>
      <ul className="trip-details">
        <TripDepartureLocation
          destination={tripDestination?.name}
          startingLocation={startingLocation?.name}
        />

        {tripFacilities.length > 0 && (<TripFacilities tripFacilities={tripFacilities}/>)}
        {trip.gear.length > 0 && (<TripGear tripGear={trip.gear}/>)}
        <TripLocations
          destination={tripDestination?.name}
          startingLocation={startingLocation?.name}
          tripLocations={tripLocations.map((location) => location?.name)}

        />
        <TripCategories tripCategories={trip.categories} primary={trip.primaryCategory}/>
      </ul>
    </div>
  );
}

import React from 'react';
import TripScheudle from './TripSchedule';
import { formatDigit } from '../../utils';

export const TripsListCard = ({ tripList }) => {
  const tripListResults = tripList.results;
  return (
    <div>
      {tripListResults.map((trip, index) => {
        if (trip.trip_schedule.length <= 0) {
          return null;
        }
        return formatTripCard(trip);
      })}
    </div>
  );
};

const formatTripCard = trip => {
  return (
    <div key={trip.id} className='item'>
      <div className='row blog blog-medium margin-bottom-40'>
        <div className='col-md-3'>
          <img
            className='img-responsive'
            src={trip.metadata.poster}
            alt={trip.name}
          />
        </div>
        <div className='col-md-8'>
          <h2>
            <a className='normal' href='#'>
              {trip.name}
            </a>
          </h2>
          <div className='dp-post-tags'>
            <ul className='list-unstyled list-inline dp-info'>
              <li>
                <TripScheudle schedules={trip.trip_schedule} />
              </li>
              <li>
                <a className='tooltips' title='' href='#'>
                  {trip.duration} Days
                </a>
              </li>
              <li>
                <a key={trip.id} className='tooltips' title='' href='#'>
                  ${formatDigit(trip.price)}
                </a>
              </li>
            </ul>
            <ul className='list-unstyled list-inline dp-tags'>
              <li>
                <a href={'#' + trip.starting_location.slug}>
                  {trip.starting_location.name}
                </a>
                {trip.locations_included.map((location, index) => {
                  return (
                    <a key={index} href={'#' + location.slug}>
                      {location.name}
                    </a>
                  );
                })}
              </li>
            </ul>
          </div>
          <p>
            <a className='btn-u btn-u-sm' href='#'>
              Book Now
            </a>
          </p>
        </div>
      </div>
      <hr className='clearfix margin-bottom-40' />
    </div>
  );
};

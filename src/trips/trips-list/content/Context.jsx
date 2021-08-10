import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {Col} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import TripCard from './TripCard';
import {getTrips, getTripsMetaData} from "../../data/selectors";
import classNames from 'classnames';
import {getLoadingStatus} from "../data/selectors";

const Results = () => {
  const isLoading = useSelector(getLoadingStatus);
  const trips = useSelector(getTrips);
  const tripsMeta = useSelector(getTripsMetaData);
  return (
    <div>
      <p> Trips: {trips.length} -- {tripsMeta.count} </p>
      <div className={classNames(
        'search-results',
        {
          'loading': isLoading,
        },
      )}
      >
        {trips.map((trip, idx) => (
          <TripCard trip={trip} key={`trip-card-${idx}`}/>
        ))}
      </div>
      {tripsMeta.next && (
        <div className="load-more">
          <button
            type="button"
            className="btn btn-success btn-block"
            data-href="#"
          >
            <FontAwesomeIcon icon="sync" className="mr-1"/>
            Load More {`${tripsMeta.current + 1}`}
          </button>
        </div>
      )}
    </div>
  );
};
export default Results;

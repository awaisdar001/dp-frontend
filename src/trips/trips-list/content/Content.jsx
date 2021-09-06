import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useSelector} from 'react-redux';
import TripCard from './TripCard';
import {getLoadingStatus, getTrips, getTripsMetaData} from "../../data/selectors";
import classNames from 'classnames';

const Content = () => {
  const isLoading = useSelector(getLoadingStatus);

  const trips = useSelector(getTrips);
  const tripsMeta = useSelector(getTripsMetaData);
  if (isLoading) {
    return <></>
  }

  return (
    <div>
      <div
        className={classNames('search-results', {
          loading: isLoading,
        })}
      >
        {trips.map((trip, idx) => <TripCard trip={trip} key={`trip-card-${idx}`}/>)}
      </div>

      {tripsMeta.next && (
        <div className="load-more">
          <button
            type="button"
            className="btn btn-success btn-block"
            data-href="#"
          >
            <FontAwesomeIcon icon="sync" className="mr-1"/>
            Load Page {`${tripsMeta.current + 1}`}
          </button>
        </div>
      )}
    </div>
  );
};
export default Content;

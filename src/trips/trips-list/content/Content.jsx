import classNames from 'classnames';
import React, {useEffect} from 'react';
import {useInView} from 'react-intersection-observer';
import {useDispatch, useSelector} from 'react-redux';

import {getLoadingStatus, getTrips, getTripsMetaData} from '../../data/selectors';
import {fetchTripsNextPage} from '../../data/thunks';
import TripCard from './TripCard';
import TripsListPagination from "./TripsListPagination";

const Content = () => {
  const isLoading = useSelector(getLoadingStatus);
  const dispatch = useDispatch();
  const {ref, inView, entry} = useInView({
    threshold: 1,
  });

  const trips = useSelector(getTrips);
  const tripsMeta = useSelector(getTripsMetaData);
  useEffect(() => {
    if (inView === true) {
      dispatch(fetchTripsNextPage({pageUrl: tripsMeta.next}));
    }
  }, [dispatch, inView, tripsMeta.next]);

  return (
    <div>
      <h1>Total: {trips.length}</h1>
      <div
        className={classNames('search-results', {
          loading: isLoading,
        })}
      >
        {trips.map((trip, idx) => (
          <TripCard trip={trip} key={`trip-card-${idx}`}/>
        ))}
      </div>

      {!isLoading && <TripsListPagination next={tripsMeta.next} nextPageRef={ref}/>}
    </div>
  );
};
export default Content;




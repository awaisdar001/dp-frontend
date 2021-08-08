import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import Sidebar from '../side-bar';
import TripCard from './TripCard';
import {getLoadingStatus, getTrips, getTripsMetaData} from "../../data/selectors";
import classNames from 'classnames';

const Results = () => {
  const isLoading = useSelector(getLoadingStatus);
  const trips = useSelector(getTrips);
  const tripsMeta = useSelector(getTripsMetaData);
  return (
    <div className="results-wrapper">
      <Row>
        <Col lg={3}>
          <Sidebar/>
        </Col>
        <Col lg={9}>
          <p>
            Trips: {trips.length} -- {tripsMeta.count}
          </p>
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
        </Col>
      </Row>
    </div>
  );
};
export default Results;

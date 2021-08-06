import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector, useStore } from 'react-redux';
// import { selectLoading } from '../../../../store_old/features/trips';
import Sidebar from '../side-bar';
import TripCard from './TripCard';

const Results = () => {
  const loading = false;
  const store = useStore();
  const state = store.getState();
  const { trips } = state.entities.trips;
  const { tripsMeta } = state.entities.trips;
  const loadingClass = loading ? 'loading' : '';

  return (
    <div className="results-wrapper">
      <Row>
        <Col lg={3}>
          <Sidebar />
        </Col>
        <Col lg={9}>
          <p>
            Trips: {trips.length} -- {state.entities.trips.tripsMeta.count}
          </p>
          <div className={'search-results ' + loadingClass}>
            {trips.map(() => (
              <TripCard />
            ))}
          </div>
          {tripsMeta.next && (
            <div className="load-more">
              <button
                type="button"
                class="btn btn-success btn-block"
                data-href=""
              >
                <FontAwesomeIcon icon="sync" className="mr-1" />
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

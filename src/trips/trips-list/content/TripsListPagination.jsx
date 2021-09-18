import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function TripsListPagination({ next, nextPageRef }) {
  if (!next) {
    return (
      <div className="d-flex justify-content-center bd-highlight mb-3">
        <span>You have reached at the end of the trips.</span>
      </div>
    );
  }

  return (
    <div className="load-more">
      <button type="button" className="btn btn-success btn-block" ref={nextPageRef}>
        <FontAwesomeIcon icon="sync" className="mr-1" />
        Load next page
      </button>
    </div>
  );
}

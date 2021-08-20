import React from 'react';
import { Col, Row } from 'react-bootstrap';

export default function TripLocations({ destination, tripLocations, startingLocation }) {
  return (
    <li className="item">
      <Row>
        <Col lg={2} as="h5" className="item-heading">
          Locations
        </Col>
        <Col lg={10} className="item-value">
          <ul>
            {startingLocation && <li className="tick">{startingLocation}</li>}
            {destination && <li className="tick">{destination}</li>}
            {tripLocations && tripLocations.map((location) => <li key={location} className="tick">{location}</li>)}
          </ul>
        </Col>
      </Row>
    </li>
  );
}

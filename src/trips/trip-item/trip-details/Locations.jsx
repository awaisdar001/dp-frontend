import React from 'react';
import { Col, Row } from 'react-bootstrap';

export default function TripLocations({ destination, tripLocations, startingLocation }) {
  const allLocations = [...new Set(tripLocations.concat(destination, startingLocation))]
  return (
    <li className="item">
      <Row>
        <Col lg={2} as="h5" className="item-heading">
          Locations
        </Col>
        <Col lg={10} className="item-value">
          <ul>
            {allLocations.map((location) => (
              <li key={location} className="tick">
                {location}
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </li>
  );
}

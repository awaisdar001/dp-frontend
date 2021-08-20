import React from 'react';
import { Col, Row } from 'react-bootstrap';

export default function TripDepartureLocation({ startingLocation, destination }) {
  return (
    <li className="item">
      <Row>
        <Col lg={2} as="h5" className="item-heading">
          Departure / Destination
        </Col>
        <Col className="item-value" lg={10}>
          <ul>
            {startingLocation && <li className="value">{startingLocation}</li>}
            {destination && <li className="arrow-fw">{destination}</li>}
          </ul>
        </Col>
      </Row>
    </li>
  );
}

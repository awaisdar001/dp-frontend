import React from 'react';
import { Col, Row } from 'react-bootstrap';

export default function TripFacilities({ tripFacilities }) {
  return (
    <li className="item">
      <Row>
        <Col lg={2} as="h5" className="item-heading">
          Facilities
        </Col>
        <Col lg={10} className="item-value">
          <ul>
            {Object.keys(tripFacilities).map((facilityId) => (
              <li key={facilityId} className="tick">{tripFacilities[facilityId].name}</li>
            ))}
          </ul>
        </Col>
      </Row>
    </li>
  );
}

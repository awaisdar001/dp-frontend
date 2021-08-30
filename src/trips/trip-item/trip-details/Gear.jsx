import React from 'react';
import { Col, Row } from 'react-bootstrap';

export default function TripGear({ tripGear }) {
  return (
    <li className="item">
      <Row>
        <Col lg={2} as="h5" className="item-heading">
          Recommended Gear
        </Col>
        <Col lg={10} className="item-value">
          <ul>
            {tripGear.map((gear) => (
              <li key={gear.slug} className="tick">{gear.name}</li>
            ))}
          </ul>
        </Col>
      </Row>
    </li>
  );
}

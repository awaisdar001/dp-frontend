import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { useModels } from "../../generic/model-store";

export default function Facilities({ trip }) {
  const tripFacilities = useModels('facility', trip.facilities);

  return (
    <div id="id-facilities" className="trip-facilities-wrapper wrapper-block">
      <h3 className="h3">Details</h3>
      <ul className="trip-facilities">
        <li className="item">
          <Row>
            <Col lg={2} as="h5" className="facility-heading">
              Departure / Destination Location
            </Col>
            <Col className="facility-value" lg={10}>
              <ul>
                <li className="value">{trip.startingLocation}</li>
                <li className="arrow-fw">{trip.destination}</li>
              </ul>
            </Col>
          </Row>
        </li>
        <li className="item">
          <Row>
            <Col lg={2} as="h5" className="facility-heading">
              Facilities
            </Col>
            <Col lg={10} className="facility-value">
              <ul>
                {tripFacilities.map((facility) => (
                  <li className="tick">{facility.name}</li>
                ))}
              </ul>
            </Col>
          </Row>
        </li>
        <li className="item">
          <Row>
            <Col lg={2} as="h5" className="facility-heading">
              Gear
            </Col>
            <Col lg={10} className="facility-value">
              <ul>
                {trip.gear.map((gear) => (
                  <li className="tick">{gear}</li>
                ))}
              </ul>
            </Col>
          </Row>
        </li>
        <li className="item">
          <Row>
            <Col lg={2} as="h5" className="facility-heading">
              LOCATIONS
            </Col>
            <Col lg={10} className="facility-value">
              <ul>
                <li className="tick">{trip.startingLocation}</li>
                <li className="tick">{trip.destination}</li>
                {trip.locations.map((location) => (
                  <li className="tick">{location}</li>
                ))}
              </ul>
            </Col>
          </Row>
        </li>
        <li className="item">
          <Row>
            <Col lg={2} as="h5" className="facility-heading">
              Category
            </Col>
            <Col lg={10} className="facility-value">
              <ul>
                {trip.categories.map((location) => (
                  <li className="tick">{location}</li>
                ))}
              </ul>
            </Col>
          </Row>
        </li>
      </ul>
    </div>
  );
}

import { Col, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import React from 'react';

export const TripItemPlaceholder = () => {
  return (
    <Row>
      <Col md={12}>
        <Skeleton
          count={1}
          duration={2}
          height={360}
          style={{ top: '-50px', marginBottom: '10px' }}
        />
      </Col>
      <Col md={9}>
        <Skeleton count={20} duration={2} />
      </Col>
      <Col md={3}>
        <Skeleton count={10} duration={2} />
      </Col>
    </Row>
  );
};

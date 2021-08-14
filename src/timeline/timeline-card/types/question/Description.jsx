import React from 'react';
import { Col } from 'react-bootstrap';

export default ({ name, absUrl }) => {
  return (
    <Col md={12}>
      <h4>
        <a href={absUrl}>{name}</a>
      </h4>
    </Col>
  );
};


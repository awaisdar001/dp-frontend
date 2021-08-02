import React from 'react';
import { Col } from 'react-bootstrap';

export default function Description(props) {
  return (
    <Col md={12}>
      <div className="description">
        <p dangerouslySetInnerHTML={{ __html: props.description }}></p>
      </div>
    </Col>
  );
}

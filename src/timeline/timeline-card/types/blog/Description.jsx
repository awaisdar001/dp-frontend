import React from 'react';
import { Col } from 'react-bootstrap';

export default function Description({ name, description, absUrl }) {
  return (
    <>
      <Col md={12}>
        <h4>
          <a href={absUrl}>{name}</a>
        </h4>
      </Col>
      <Col md={12}>
        <div className="description">
          <p dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
      </Col>
    </>
  );
}

import React from 'react';
import {Col} from 'react-bootstrap';

export default function Description({description}) {
  return (
    <Col md={12}>
      <div className="description">
        <p dangerouslySetInnerHTML={{__html: description}}></p>
      </div>
    </Col>
  );
}

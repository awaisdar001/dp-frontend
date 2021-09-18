import React from 'react';
import { Col,Container, Row } from 'react-bootstrap';
// import KumratBackground from '../public/static/media/kumrat-valley-poster.jpg'
// background-image: url(/static/media/kumrat-valley-poster.jpg);

export default function tripCrums() {

  return (
    // <div className="tripcrum bg-1" style={{ 'background-image': `url(${KumratBackground})` }}>
    <div className="tripcrum bg-1">
      <Container>
        <Row>
          <Col xl={12}>
            <div className="text-center">
              <h3>Begin your journey</h3>
              <p>Pixel perfect design with awesome contents</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

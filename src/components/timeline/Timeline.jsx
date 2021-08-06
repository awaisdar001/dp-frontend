import React from 'react';
import { Container, Row } from 'react-bootstrap';
// import DPAccordion from './left-accordion';
import TimelineContent from './TimelineContent';
// import RightMenuBar from './right-menu-bar';

export default function Timeline() {
  return (
    <Container fluid>
      <Row className="flex-xl-nowrap flex-container">
        {/*<DPAccordion />*/}
        <TimelineContent />
        {/*<RightMenuBar />*/}
      </Row>
    </Container>
  );
}

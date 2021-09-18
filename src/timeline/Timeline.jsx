import React from 'react';
import { Container, Row } from 'react-bootstrap';

import DPAccordion from './left-accordion';
import RightMenuBar from './right-menu-bar';
import TimelineContent from './TimelineContent';

export default function Timeline() {
  return (
    <Container fluid>
      <Row className="flex-xl-nowrap flex-container">
        <DPAccordion />
        <TimelineContent />
        <RightMenuBar />
      </Row>
    </Container>
  );
}

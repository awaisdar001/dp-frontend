import React from 'react';
import { Container, Row } from 'react-bootstrap';
import DPAccordion from './leftAccordion';
import TimelineContent from './timelineContent';
import RightMenuBar from './rightMenuBar';

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

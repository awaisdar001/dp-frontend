import { Container, Row, Col } from 'react-bootstrap';

export default function tripCrums() {
  return (
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

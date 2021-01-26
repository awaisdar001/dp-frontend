import { Col, Row } from 'react-bootstrap';

export default function Facilities() {
  return (
    <div
      id="id-facilities"
      name="facilities"
      className="trip-facilities-wrapper wrapper-block"
    >
      <h3 class="h3">Facilities</h3>
      <ul className="trip-facilities">
        <li className="item">
          <Row>
            <Col lg={2} as="h5" className="facility-heading">
              Departure/Return Location
            </Col>
            <Col className="facility-value" lg={10}>
              <ul>
                <li className="tick">Accommodation (3-4 persons sharing)</li>
                <li className="tick">Camps (3 persons sharing)</li>
                <li className="tick">Sleeping mattress</li>
                <li className="tick">Sleeping mattress</li>
                <li className="tick">Sleeping mattress</li>
              </ul>
            </Col>
          </Row>
        </li>

        <li className="item">
          <Row>
            <Col lg={2} as="h5" className="facility-heading">
              ACTIVITIES
            </Col>
            <Col lg={10} className="facility-value">
              <div className="value">Fitness</div>
            </Col>
          </Row>
        </li>
        <li className="item">
          <Row>
            <Col lg={2} as="h5" className="facility-heading">
              LOCATIONS
            </Col>
            <Col lg={10} className="facility-value">
              <ul>
                <li className="tick">Fairy Meadows</li>
                <li className="tick">Naran</li>
                <li className="tick">Hunza & Nagar</li>
                <li className="tick">Bayal Camp</li>
                <li className="tick">Khunjerab Pass</li>
                <li className="tick">Attabad Lake</li>
                <li className="tick">Passu Cones & Glacier</li>
                <li className="tick">Karimabad</li>
                <li className="tick">Rakaposhi View Point</li>
                <li className="tick">Altit Fort</li>
                <li className="tick">Baltit Fort</li>
                <li className="tick">Gulmit</li>
                <li className="tick">Hussaini Suspension Bridge</li>
                <li className="tick">Kaghan</li>
                <li className="tick">Babusar Top</li>
                <li className="tick">Lulusar Lake</li>
                <li className="tick">Nanga Parbat View Point</li>
                <li className="tick">Nanga Parbat Basecamp</li>
                <li className="tick">Tatto</li>
                <li className="tick">Raikot bridge</li>
              </ul>
            </Col>
          </Row>
        </li>
        <li className="item">
          <Row>
            {' '}
            <Col lg={2} as="h5" className="facility-heading">
              Category
            </Col>
            <Col lg={10} className="facility-value">
              <div className="value">Advanture</div>
            </Col>
          </Row>
        </li>
      </ul>
    </div>
  );
}

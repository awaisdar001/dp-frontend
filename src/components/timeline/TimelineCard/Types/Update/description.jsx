import { Col } from 'react-bootstrap';

export default function UpdateBody({ name, description, nodeURL }) {
  return (
    <>
      <Col md={12}>
        <h4>
          <a href={nodeURL}>{name}</a>
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

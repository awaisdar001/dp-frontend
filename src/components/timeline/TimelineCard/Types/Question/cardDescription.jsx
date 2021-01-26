import { Col } from 'react-bootstrap';

const QuestionTitle = ({ name, nodeURL }) => {
  return (
    <Col md={12}>
      <h4>
        <a href={nodeURL}>{name}</a>
      </h4>
    </Col>
  );
};

export default QuestionTitle;

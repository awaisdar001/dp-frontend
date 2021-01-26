import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';
import { Accordion, Card } from 'react-bootstrap';

const Header = ({ title }) => {
  return (
    <Accordion.Toggle as={Card.Header} eventKey="0">
      <span className="card-title">{title}</span>
      <FontAwesomeIcon
        icon="angle-down"
        pull="right"
        className="margin-top-5"
      />
    </Accordion.Toggle>
  );
};
export default memo(Header);

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'moment-timezone';
import { Col } from 'react-bootstrap';
import FBComments from '../../common/facebookComment';
import { MomentTime } from '../../common/momentTime';

export default function CardFooter({ absUrl, createdAt, seenCount }) {
  return (
    <Col md={12}>
      <div className="timeline-footer">
        <span className="margin-right-5">
          <a href={absUrl} c={createdAt}>
            <FontAwesomeIcon icon="calendar-alt" className="margin-right-3" />
            <MomentTime propDateTime={createdAt} />
          </a>
        </span>
        <span>
          <FBComments absUrl={absUrl} />
        </span>
        <span className="auto-margin-left">
          <a href={absUrl}>
            <FontAwesomeIcon icon="eye" className="margin-right-3" />
            <span>{seenCount.display}</span>
          </a>
        </span>
      </div>
    </Col>
  );
}

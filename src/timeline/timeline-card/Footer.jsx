import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'moment-timezone';
import React from 'react';
import { Col } from 'react-bootstrap';
import { FacebookComment, MomentTime } from '../../components/common';

export default function Footer({ absUrl, createdAt, seenCount }) {
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
          <FacebookComment absUrl={absUrl} />
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

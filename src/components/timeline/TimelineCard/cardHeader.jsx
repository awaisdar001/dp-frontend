import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function CardHeader(props) {
  const { username, title, icon, is_new, profileURL, nodeURL } = props;
  return (
    <h2>
      {icon && <FontAwesomeIcon icon={icon} />}
      <a className="margin-right-5" href={profileURL}>
        {username}
      </a>

      <a href={nodeURL} className="small margin-right-5">
        {title}
      </a>
      {is_new && <span className="badge badge-u">New</span>}
    </h2>
  );
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function Header({ username, title, icon, isNew, profileURL, nodeURL }) {
  return (
    <h2>
      {icon && <FontAwesomeIcon icon={icon} />}
      <a className="margin-right-5" href={profileURL}>
        {username}
      </a>

      <a href={nodeURL} className="small margin-right-5">
        {title}
      </a>
      {isNew && <span className="badge badge-u">New</span>}
    </h2>
  );
}

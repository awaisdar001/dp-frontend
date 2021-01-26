import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

export default memo(function ({ className = '' }) {
  return (
    <div className={'item-metadata ' + className}>
      <div className="meta-item">
        <span className="meta-icon">
          <FontAwesomeIcon icon={faClock} className="mr-1" />
        </span>
        <span className="meta-description">
          <a href="/">6 Days & 5 Nights</a>
        </span>
      </div>
      <div className="meta-item">
        <span className="meta-icon">
          <FontAwesomeIcon icon="user-friends" className="mr-1" />
        </span>
        <span className="meta-description">
          <a href="/">21+</a>
        </span>
      </div>
      <div className="meta-item">
        <span className="meta-icon">
          <FontAwesomeIcon icon="book" className="mr-1" />
        </span>
        <span className="meta-description">
          <a href="/sightseeing">Sightseeing</a>
        </span>
      </div>
      <div className="meta-item">
        <span className="meta-icon">
          <FontAwesomeIcon icon="fire-alt" className="mr-1" />
        </span>
        <span className="meta-description">
          <a href="/">Naran / Hunza & Nagar</a>
        </span>
      </div>
    </div>
  );
});

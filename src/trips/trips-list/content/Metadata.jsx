import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

const Metadata = function ({ hostName, category, duration, destination, className = '' }) {
  return (
    <div className={'item-metadata ' + className}>
      <div className="meta-item">
        <span className="meta-icon">
          <FontAwesomeIcon icon={faClock} className="mr-1" />
        </span>
        <span className="meta-description">
          <a href="/">
            {duration === 1 ? (
              <span>{duration} Day</span>
            ) : (
              <span>
                {duration} Days & {duration - 1} Nights
              </span>
            )}
          </a>
        </span>
      </div>
      {hostName && (
        <div className="meta-item">
          <span className="meta-icon">
            <FontAwesomeIcon icon={'user-alt'} className="mr-1" />
          </span>
          <span className="meta-description">
            <a href="/">{hostName}</a>
          </span>
        </div>
      )}

      {category && (
        <div className="meta-item">
          <span className="meta-icon">
            <FontAwesomeIcon icon="book" className="mr-1" />
          </span>
          <span className="meta-description">
            <a href={`/trip/category/${category.slug}`}>{category.name}</a>
          </span>
        </div>
      )}

      {destination && (
        <div className="meta-item">
          <span className="meta-icon">
            <FontAwesomeIcon icon="fire-alt" className="mr-1" />
          </span>
          <span className="meta-description">
            <a href="/">{destination.name}</a>
          </span>
        </div>
      )}
    </div>
  );
};

export default React.memo(Metadata);

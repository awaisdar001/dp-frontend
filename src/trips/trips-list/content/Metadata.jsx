import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClock} from '@fortawesome/free-regular-svg-icons';

export default React.memo(function ({ageLimit, category, duration, tripDestination, className = ''}) {

  return (
    <div className={'item-metadata ' + className}>
      <div className="meta-item">
        <span className="meta-icon">
          <FontAwesomeIcon icon={faClock} className="mr-1"/>
        </span>
        <span className="meta-description">
          <a href="/">{duration} Days & {duration - 1} Nights</a>
        </span>
      </div>
      <div className="meta-item">
        <span className="meta-icon">
          <FontAwesomeIcon icon="user-friends" className="mr-1"/>
        </span>
        <span className="meta-description">
          <a href="/">{ageLimit}+</a>
        </span>
      </div>
      <div className="meta-item">
        <span className="meta-icon">
          <FontAwesomeIcon icon="book" className="mr-1"/>
        </span>
        <span className="meta-description">
          <a href={`/trip/category/${category.slug}`}>{category.name}</a>
        </span>
      </div>
      <div className="meta-item">
        <span className="meta-icon">
          <FontAwesomeIcon icon="fire-alt" className="mr-1"/>
        </span>
        <span className="meta-description">
          <a href="/">{tripDestination}</a>
        </span>
      </div>
    </div>
  );
});

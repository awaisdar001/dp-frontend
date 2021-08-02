import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';

export default React.memo(function () {
  return (
    <div className="item-rating wrapper-block">
      <h3 className="h3">Reviews and Ratings</h3>
      <div className="rating-wrapper">
        <span className="rating-stars-wrapper">
          <span className="rating-stars">
            <FontAwesomeIcon icon="star" className="mr-2" />
            <FontAwesomeIcon icon="star" className="mr-2" />
            <FontAwesomeIcon icon="star-half-alt" className="mr-2" />
            <FontAwesomeIcon icon={faStar} className="mr-2" />
            <FontAwesomeIcon icon={faStar} />
          </span>
          <div className="rating-review-summary">
            <span className="reviews-count mr-1">2</span>
            <span className="reviews-label">Reviews</span>
          </div>
        </span>
      </div>
    </div>
  );
});

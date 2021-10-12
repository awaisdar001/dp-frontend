import {faStar} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';


const ReadOnlyRating = React.memo(function ({rating, ratedBy}) {
  let remainder = rating % 1;
  const fullStar = <FontAwesomeIcon icon="star" className="mr-2"/>
  const halfStar = <FontAwesomeIcon icon="star-half-alt" className="mr-2"/>
  const emptyStar = <FontAwesomeIcon icon={faStar} className="mr-2"/>

  const RatingIcons = () => {
    return [...Array(5)].map((item, index) => {
      const currentRating = index + 1;
      let _icon = 'star';
      if (currentRating <= rating) {
        _icon = 'star';
      } else if (remainder > 0) {
        remainder = 0;
        _icon = "star-half-alt";
      } else {
        _icon = faStar
      }
      return <FontAwesomeIcon key={currentRating} icon={_icon} className="mr-2"/>
    });
  }

  return (
    <div className="item-rating wrapper-block">
      <h3 className="h3">Reviews and Ratings</h3>
      <div className="rating-wrapper">
        <span className="rating-stars-wrapper">
          <span className="rating-stars">
            <RatingIcons/>
          </span>
          <div className="rating-review-summary">
            <span className="reviews-count mr-1">{ratedBy}</span>
            <span className="reviews-label">Reviews</span>
          </div>
        </span>
      </div>
    </div>
  );
});

export default ReadOnlyRating
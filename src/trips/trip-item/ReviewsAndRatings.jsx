import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { useModel } from '../../generic/model-store';

const RenderProgressBar = ({ title, number }) => (
  <div className="progress-rating">
    <p className="rating-title" style={{ margin: '10px 0 1px' }}>
      <span className="title">{title}</span>
      <span className="percent float-right">{number}</span>
    </p>
    <ProgressBar
      className="flat-progress"
      now={number}
      label={`${number}%`}
      srOnly
      variant="dp-success"
    />
  </div>
);

function ReviewsAndRatings({host}) {
  const {rating} = useModel('host', host);

  return (
    <div id="reviews" className="trip-review-wrapper wrapper-block">
      <h3 className="h3">Tour Review Scores And Score Breakdown</h3>
      <Row>
        <Col lg={3} className="rating-average">
          <div className="average">
            <span>{rating.value}</span>
            <small> / </small>
            <span>5</span>
          </div>

          <div className="average-description">
            <h4 className="">{rating.feedback} </h4>
          </div>
        </Col>
        <Col lg={9} className="rating-percentage">
          <RenderProgressBar title="Overall" number={rating.percent}/>
          {/*<RenderProgressBar title="Meals" number="60" />*/}
          {/*<RenderProgressBar title="Accommodation" number="50" />*/}
          {/*<RenderProgressBar title="Transport" number="90" />*/}
          {/*<RenderProgressBar title="Value for Money" number="90" />*/}
        </Col>
      </Row>
    </div>
  );
}

export default ReviewsAndRatings;

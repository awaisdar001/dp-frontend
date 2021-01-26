import ProgressBar from 'react-bootstrap/ProgressBar';
import { Row, Col } from 'react-bootstrap';

const RenderProgressBar = ({ title, number }) => (
  <div className="progress-rating">
    <p className="rating-title" style={{ margin: '10px 0 1px' }}>
      <span class="title">{title}</span>
      <span class="percent float-right">{number}</span>
    </p>
    <ProgressBar
      className="falt-progress"
      now={number}
      label={`${number}%`}
      srOnly
      variant="dp-success"
    />
  </div>
);

function ReviewsAndRatings() {
  return (
    <div id="reviews" className="trip-review-wrapper wrapper-block">
      <h3 class="h3">Tour Review Scores And Score Breakdown</h3>
      <Row>
        <Col lg={3} className="rating-average">
          <div className="average">6.9</div>
          <div className="average-description">
            <h4 class="">Good </h4>
          </div>
        </Col>
        <Col lg={9} className="rating-percentage">
          <RenderProgressBar title="Overall" number="100" />
          <RenderProgressBar title="Meals" number="60" />
          <RenderProgressBar title="Accommodation" number="50" />
          <RenderProgressBar title="Transport" number="90" />
          <RenderProgressBar title="Value for Money" number="90" />
        </Col>
      </Row>
    </div>
  );
}

export default ReviewsAndRatings;

import { Button, Col, Row, Form } from 'react-bootstrap';
import { RatingPlugin } from '../TripCommon';

const RenderInput = (props) => {
  const id = `id-${props.name}`;
  return (
    <input
      id={id}
      className="theme-input"
      type="text"
      aria-required="true"
      {...props}
    />
  );
};
function PostComment() {
  return (
    <div className="trip-comment-wrapper wrapper-block">
      <h3 class="h3 comment-title">Post a Comment</h3>
      <Row>
        <Col lg={{ span: 11, offset: 1 }}>
          <form id="form-trip-comment">
            <RatingPlugin title="Overall" name="overall" rating={2} />
            <RatingPlugin title="Meals" name="meals" rating={3} />
            <RatingPlugin
              title="Accommodation"
              name="accommodation"
              rating={4}
            />
            <RatingPlugin title="Transport" name="transport" rating={3} />
            <RatingPlugin title="Value For Money" name="vfmoney" rating={5} />
            <textarea
              id="comment"
              className="theme-textarea"
              placeholder="Your comment"
              name="comment"
              cols="45"
              rows="6"
              required={true}
              aria-required="true"
            ></textarea>
            <Form.Row>
              <Col>
                <RenderInput
                  name="author"
                  placeholder="Your Name"
                  required={true}
                />
              </Col>
              <Col>
                <RenderInput
                  name="email"
                  placeholder="Your Email"
                  required={true}
                />
              </Col>
            </Form.Row>
            <Button className="d-block" type="submit" variant="dp-success">
              Submit
            </Button>
          </form>
        </Col>
      </Row>
    </div>
  );
}

export default PostComment;

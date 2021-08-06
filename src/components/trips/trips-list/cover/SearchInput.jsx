import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
// import { updateTripsByKeyword } from '../../../../store_old/features/trips';

const MainSearchInput = () => {
  const [keyword, setKeyword] = React.useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    // dispatch(updateTripsByKeyword(keyword));
  };

  return (
    <div className="search-trips">
      <Container>
        <Row className="align-items-center">
          <Col lg={3}>
            <div className="search-heading">
              <h3>Where you want to go?</h3>
            </div>
          </Col>
          <Col lg={9}>
            <div className="trips-form-wrapper">
              <form className="search_form" action="#">
                <div className="input_field col-lg-10">
                  <input
                    type="text"
                    name="keyword"
                    placeholder="Where to go?"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
                <div className="btn-search col-lg-2">
                  <button
                    id="id-search-keyword"
                    className="btn btn-success btn-block btn-lg"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default MainSearchInput;

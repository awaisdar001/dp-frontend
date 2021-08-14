import React from 'react';
import { Row } from 'react-bootstrap';
import Metadata from './Metadata';
import Rating from './Rating';
import { Title, TitlePrice } from '../../TripCommon';
import { Link } from 'react-router-dom';

let backgroundPoster = {
  backgroundImage:
    'url(https://fma-trips.s3-ap-southeast-1.amazonaws.com/trips-photos/2acdc23d-d2b6-485c-9706-93e72bc10128.png)',
};
const TripCard = ({ trip }) => {
  const tripUrl = `/trip/${trip.slug}`;
  const tripMinPrice = trip.tripSchedule.reduce(function (prev, curr) {
    return prev.price < curr.price ? prev : curr;
  }).price;
  const tripCategory = trip.category;

  return (
    <Row className="m-0">
      <div className="trip-item">
        <div className="trip-item-container">
          <div className="item-poster">
            <div className="item-poster-inner">
              <Link to={tripUrl} className="img-fluid" style={backgroundPoster}>
                {/* <a href="/" className="img-fluid" style={backgroundPoster}> */}
                <img
                // src="https://wanderers.qodeinteractive.com/wp-content/uploads/2018/02/tour-1-featured-img.jpg"
                // src="https://fma-trips.s3-ap-southeast-1.amazonaws.com/trips-photos/2acdc23d-d2b6-485c-9706-93e72bc10128.png"
                // className="img-fluid"
                // alt="Trips poster"
                />
              </Link>

              <span className="item-label-overlay">
                <span className="item-label-container">
                  <span className="item-label">fun</span>
                </span>
              </span>
            </div>
          </div>
          <div className="item-detail">
            <Title name={trip.name} url={tripUrl} />
            <TitlePrice price={trip.tripSchedule && tripMinPrice} />
            <div className="item-description">
              <p>{trip.description.substring(0, 500)} </p>
            </div>

            <Rating />

            <Metadata
              className="mt-4"
              duration={trip.duration}
              ageLimit={trip.ageLimit}
              category={tripCategory}
              tripDestination={trip.destination.name}
            />
          </div>
        </div>
      </div>
    </Row>
  );
};
export default React.memo(TripCard);

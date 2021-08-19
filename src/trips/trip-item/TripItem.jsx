import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Title, TitlePrice } from '../TripCommon';
import Metadata from '../trips-list/content/Metadata';
import BookingSideBar from './booking-sidebar';
import CancellationPolicy from './CancellationPolicy';
import Carousel from './Carousel';
import Facilities from './Facilities';
import Location from './Location';
import PostComment from './PostComment';
import ReviewsAndRatings from './ReviewsAndRatings';
import TourPlan from './TourPlan';
import TripHeader from './trip-header';
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import { getTrip } from "../data/selectors";
import { useModel } from "../../generic/model-store";
import { createMarkup } from "../../utils";

export default function TripItem() {
  let { slug } = useParams();
  console.log(slug);
  const [trip] = useSelector(getTrip(slug))
  console.log(trip);

  // #todo move this to a util so that trip item & trip list can use it. Or maybe to api.js
  const tripMinPrice =
    trip.tripSchedule &&
    trip.tripSchedule.reduce((prev, curr) =>
      prev.price < curr.price ? prev : curr,
    ).price;
  const primaryCategory = useModel('category', trip.primaryCategory);
  const tripDestination = useModel('location', trip.destination);

  return (
    <div className="dp-trips">
      <Carousel />
      <Container fluid>
        <TripHeader />
        <div className="trip-wrapper">
          <Row>
            <Col lg={9}>
              <div className="item-detail">
                <Title
                  className="float-left"
                  name={trip.name}
                  url="/"
                />

                <TitlePrice className={'float-right'} price={tripMinPrice} />
                <Metadata
                  className="mt-2"
                  duration={trip.duration}
                  ageLimit={trip.ageLimit}
                  category={primaryCategory}
                  destination={tripDestination}
                />
                <hr />
                <div className="item-description">
                  <p>
                    <div dangerouslySetInnerHTML={createMarkup(trip.description)} />
                  </p>
                </div>
                <Facilities trip={trip} />
                <TourPlan trip={trip}/>
                <CancellationPolicy trip={trip}/>
                <Location />
                <ReviewsAndRatings />
                <PostComment />
              </div>
            </Col>
            <Col lg={3}>
              <BookingSideBar />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

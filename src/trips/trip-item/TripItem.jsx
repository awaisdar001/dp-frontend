import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { createMarkup } from '../../utils';
import { TripItemPlaceholder } from '../Placeholders';
import { Title, TitlePrice } from '../TripCommon';
import BookingSideBar from './booking-sidebar';
import { fetchTrip } from './data/thunks';
import {
  CancellationPolicy,
  Carousel,
  GoogleLocation,
  PostComment,
  ReviewsAndRatings,
  TourPlan,
  TripHeader,
  TripHighlights,
  TripHost,
} from './index';
import { TripDetails } from './trip-details';

export default function TripItem({ slug }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrip(slug));
  }, [dispatch, slug]);

  const isLoading = useSelector((state) => state.tripItem.loadingStatus);
  const trip = useSelector((state) => state.tripItem.trip);

  if (isLoading) {
    return <TripItemPlaceholder />;
  }
  const tripLocations = {
    destination: trip.destination,
    startingLocation: trip.startingLocation,
    locations: trip.locations,
  };
  const tripDetail = {
    ...tripLocations,
    facilities: trip.facilities,
    gear: trip.gear,
    categories: trip.categories,
    primaryCategory: trip.primaryCategory,
  };
  const tripHighlights = {
    duration: trip.duration,
    host: trip.host,
    primaryCategory: trip.primaryCategory,
    destination: trip.destination,
  };

  return (
    <div className="dp-trips">
      <Carousel />
      <Container fluid>
        <TripHeader />
        <div className="trip-wrapper">
          <Row>
            <Col lg={9}>
              <div className="item-detail">
                <Title className="float-left" name={trip.name} url="#" />
                <TitlePrice className={'float-right'} tripMinPrice={trip.minPrice} />
                <TripHighlights trip={tripHighlights} />
                <hr />
                <div className="item-description">
                  <p dangerouslySetInnerHTML={createMarkup(trip.description)} />
                </div>
                <TripDetails trip={tripDetail} />
                <TourPlan tripItinerary={trip.tripItinerary} />
                <GoogleLocation trip={tripLocations} />
                <CancellationPolicy cancellationPolicy={trip.cancellationPolicy} />
                <TripHost host={trip.host} />
                <PostComment />
              </div>
            </Col>
            <Col lg={3}>
              <BookingSideBar tripDates={trip.schedules} />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}



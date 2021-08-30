import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Container, Row} from 'react-bootstrap';
import BookingSideBar from './booking-sidebar';

import {fetchTrip} from './data/thunks';
import {Title, TitlePrice} from '../TripCommon';
import {createMarkup} from '../../utils';

import {TripDetails} from './trip-details';
import {
  CancellationPolicy,
  Carousel,
  PostComment,
  ReviewsAndRatings,
  TourPlan,
  TripHeader,
  TripHighlights,
} from './index';
import {TripItemPlaceholder} from '../Placeholders';

export default function TripItem({slug}) {
  const dispatch = useDispatch();
  const [tripPrice, setTripPrice] = useState(0);

  useEffect(() => {
    dispatch(fetchTrip(slug));
  }, [dispatch, slug]);

  const isLoading = useSelector((state) => state.tripItem.loadingStatus);
  const trip = useSelector((state) => state.tripItem.trip);

  useEffect(() => {
    if (isLoading === false) {
      setTripPrice(trip.minPrice);
    }
  }, [isLoading, trip])

  if (isLoading) {
    return <TripItemPlaceholder/>;
  } else {
    const tripDetail = {
      destination: trip.destination,
      startingLocation: trip.startingLocation,
      locations: trip.locations,
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
        <Carousel/>
        <Container fluid>
          <TripHeader/>
          <div className="trip-wrapper">
            <Row>
              <Col lg={9}>
                <div className="item-detail">
                  <Title className="float-left" name={trip.name} url="#"/>
                  <TitlePrice className={'float-right'} tripMinPrice={trip.minPrice}/>
                  <TripHighlights trip={tripHighlights}/>
                  <hr/>
                  <div className="item-description">
                    <p dangerouslySetInnerHTML={createMarkup(trip.description)}/>
                  </div>
                  <TripDetails trip={tripDetail}/>
                  {<TourPlan tripItinerary={trip.tripItinerary}/>}
                  {<CancellationPolicy cancellationPolicy={trip.cancellationPolicy}/>}
                  {/*<Location />*/}
                  <ReviewsAndRatings host={trip.host}/>
                  <PostComment/>
                </div>
              </Col>
              <Col lg={3}>
                <BookingSideBar tripDates={trip.schedules}/>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

// TripItem.propTypes = {
//   slug: PropTypes.string.isRequired,
// };

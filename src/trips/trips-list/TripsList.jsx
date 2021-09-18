import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";

import Storage from "../../storage";
import {fetchAndRestTripsListItems} from '../data/thunks';
import Content from './content';
import Cover from './cover/';
import { tripHeadingItems } from "./data/enums";
import {
  getSearchDates,
  getSearchDays,
  getSearchKeyword,
  getSearchPrices,
  getSearchState,
  getSelectedDestinations,
} from "./data/selectors";
import { fetchTripDestinations } from './data/thunks';
import Sidebar from './side-bar';
import TripsListHeader from './TripsListHeader';

export default function TripList() {
  const handleActiveItem = (id) => Storage.updateTripsActiveSorting(id);
  const activeItem = Storage.getTripsActiveSorting(1);

  const dispatch = useDispatch();
  const search = useSelector(getSearchState);
  const searchDays = useSelector(getSearchDays);
  const searchDates = useSelector(getSearchDates);
  const searchPrices = useSelector(getSearchPrices);
  const searchKeyword = useSelector(getSearchKeyword);
  const selectedDestinations = useSelector(getSelectedDestinations);

  useEffect(() => {
    dispatch(fetchTripDestinations());
  }, [dispatch]);

  useEffect(() => {
    console.log('[useEffect]: TripsList-API Call here.');
    if (selectedDestinations.length === 0) {
      return;
    }
    dispatch(
      fetchAndRestTripsListItems({
        searchDays,
        searchDates,
        searchPrices,
        searchKeyword,
        selectedDestinations,
      }),
    );
  }, [dispatch, searchDays, searchDates, searchPrices, searchKeyword, selectedDestinations]);

  return (
    <>
      <Cover />
      <Container fluid>
        <div className="dp-trips">
          <div className="search-page">
            <TripsListHeader
              items={tripHeadingItems}
              active={activeItem}
              onChange={handleActiveItem}
            />
            <div className="results-wrapper">
              <Row>
                <Col lg={3}>
                  <Sidebar />
                </Col>
                <Col lg={9}>
                  <Content />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

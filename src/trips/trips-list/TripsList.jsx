import React, {useEffect} from 'react';
import {Container} from 'react-bootstrap';
import Content from './content';
import {Col, Row} from 'react-bootstrap';
import Cover from './cover/';
import TripsListHeader from './TripsListHeader';
import {tripHeadingItems} from "./data/enums";
import {getTripsActiveSortingFromStorage, updateTripsActiveSortingFromStorage} from "../../storage";
import {useDispatch, useSelector} from "react-redux";
import {
  getSearchDates,
  getSearchDays,
  getSearchKeyword,
  getSearchPrices,
  getSearchState,
  getSelectedDestinations,
} from "./data/selectors";
import {fetchTripItems} from "../data/thunks";
import Sidebar from "./side-bar/SideBar";
import {fetchTripDestinations} from "./data/thunks";


export default function TripList() {
  const handleActiveItem = (id) => updateTripsActiveSortingFromStorage(id);
  const activeItem = getTripsActiveSortingFromStorage(1)

  const dispatch = useDispatch();
  const search = useSelector(getSearchState);
  const searchDays = useSelector(getSearchDays);
  const searchDates = useSelector(getSearchDates);
  const searchPrices = useSelector(getSearchPrices);
  const searchKeyword = useSelector(getSearchKeyword);
  const selectedDestinations = useSelector(getSelectedDestinations);


  useEffect(() => {
    dispatch(fetchTripDestinations())
  }, [])

  useEffect(() => {
    console.log('[useEffect]: TripsList-API Call here.');
    dispatch(fetchTripItems({searchDays, searchDates, searchPrices, searchKeyword, selectedDestinations}));
  }, [searchDays, searchDates, searchPrices, searchKeyword, selectedDestinations, search]);

  return (
    <>
      <Cover/>
      <Container fluid>
        <div className="dp-trips">
          <div className="search-page">
            <TripsListHeader items={tripHeadingItems} active={activeItem} onChange={handleActiveItem}/>
            <div className="results-wrapper">
              <Row>
                <Col lg={3}>
                  <Sidebar/>
                </Col>
                <Col lg={9}>
                  <Content/>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

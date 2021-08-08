import React, {useEffect} from 'react';
import {Container} from 'react-bootstrap';
import Content from './content';
import Cover from './cover/';
import TripsListHeader from './TripsListHeader';
import {tripHeadingItems} from "./data/enums";
import {getTripsActiveSortingFromStorage, updateTripsActiveSortingFromStorage} from "../../storage";
import {useDispatch, useSelector} from "react-redux";
import {
  getLoadingStatus,
  getSearchDates,
  getSearchDays,
  getSearchKeyword,
  getSearchPrices,
  getSearchState,
  getSelectedDestinations,
  getTrips,
  getTripsMetaData
} from "../data/selectors";
import {fetchTripItems} from "../data/thunks";


export default function TripList() {
  const handleActiveItem = (id) => updateTripsActiveSortingFromStorage(id);
  const activeItem = getTripsActiveSortingFromStorage(1)

  const dispatch = useDispatch();
  const searchDays = useSelector(getSearchDays);
  const searchDates = useSelector(getSearchDates);
  const searchPrices = useSelector(getSearchPrices);
  const searchKeyword = useSelector(getSearchKeyword);
  const selectedDestinations = useSelector(getSelectedDestinations);
  const search = useSelector(getSearchState);

  console.log('searchDays', searchDays);


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
            <TripsListHeader items={tripHeadingItems} active={activeItem} onChange={handleActiveItem} />
            <Content />
          </div>
        </div>
      </Container>
    </>
  );
}

import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import withSidebar from '../../../components/common/hoc/withSidebar';
import DateSlider from './DateSlider';
import DaysSlider from './DaysSlider';
import Destinations from './Destinations';
import PriceSlider from './PriceSlider';
import {
  getInitialSearchDates,
  getInitialSearchDays,
  getInitialSearchPrices,
  getSidebarDestinations
} from "../../data/selectors";
import {updateDestination, searchSliderChanged} from "../../data/slice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [minDate, maxDate] = useSelector(getInitialSearchDates);
  const [minPrice, maxPrice] = useSelector(getInitialSearchPrices)
  const [minDay, maxDay] = useSelector(getInitialSearchDays);
  const destinations = useSelector(getSidebarDestinations);

  const handleSliderChange = ({type, number}) => {
    dispatch(searchSliderChanged({type, number}));
  };
  const handleDestinationChange = ({target}, value) => {
    const destinationIndex = destinations.findIndex(destination => destination.value === value);
    dispatch(updateDestination({index: destinationIndex, selected: target.checked}));
  };

  return (
    <>
      <DaysSlider minDay={minDay} maxDay={maxDay} onChange={handleSliderChange}/>
      <DateSlider minDate={minDate} maxDate={maxDate} onChange={handleSliderChange}/>
      <PriceSlider minPrice={minPrice} maxPrice={maxPrice} onChange={handleSliderChange}/>
      <Destinations items={destinations} onChange={handleDestinationChange}/>
    </>
  );
};

export default withSidebar(Sidebar, 'Filter your Trip');

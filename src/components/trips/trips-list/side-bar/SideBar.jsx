import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadTripFromState,
  updateTripsBySlider,
  selectSearchState,
} from '../../../../store_old/features/trips';
import withSidebar from '../../../common/hoc/withSidebar';
import DateSlider from './DateSlider';
import DaysSlider from './DaysSlider';
import Destinations from './Destinations';
import PriceSlider from './PriceSlider';

const Sidebar = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearchState);

  const commitChange = (type, number) => {
    dispatch(updateTripsBySlider({ type, number }));
  };
  useEffect(() => {
    console.log('[useEffect]: Trips-API Call here.', search);
    dispatch(loadTripFromState());
  }, [search, dispatch]);

  return (
    <>
      <DaysSlider commitChange={commitChange} />
      <DateSlider commitChange={commitChange} />
      <PriceSlider commitChange={commitChange} />
      <Destinations />
    </>
  );
};

export default withSidebar(Sidebar, 'Filter your Trip');

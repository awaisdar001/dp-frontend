import _ from 'lodash';
import React, {useEffect} from 'react';
import {Button, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';

import {fetchAndRestTimelineItems} from '../data/thunks';
import {getSelectedFeedTypes, getSelectedPros} from './data/selectors';
import {restAllFilters, restFeedTypes, restProvinces,} from './data/slice';
import FeedsAccordion from './Feed';
import ProAccordion from './Province';

/**
 * Accordion component for showing checkboxes for quick filtering of timelne
 *
 */
export default function DPAccordion() {
  const dispatch = useDispatch();
  const selectedProvinces = useSelector(getSelectedPros);
  const selectedFeedTypes = useSelector(getSelectedFeedTypes);

  // Rest timeline items when pro/feed items change
  useEffect(() => {
    const selectedProvinceCount = _.size(selectedProvinces);
    const selectedFeedCount = _.size(selectedFeedTypes);

    if (selectedProvinceCount && selectedFeedCount) {
      dispatch(fetchAndRestTimelineItems({selectedProvinces, selectedFeedTypes}));
    }
    if (!selectedProvinceCount) {
      dispatch(restProvinces());
    }
    if (!selectedFeedCount) {
      dispatch(restFeedTypes());
    }
  }, [dispatch, selectedProvinces, selectedFeedTypes]);

  const handleRestButtonClick = () => dispatch(restAllFilters());

  return (
    <Col id="filter-feeds" sm={12} lg={3}>
      <div id="filter-by-block">
        <h1>Filter By</h1>
        <ProAccordion/>
        <FeedsAccordion/>
        <Button
          id="btn-reset"
          variant="success"
          size="lg"
          block
          onClick={handleRestButtonClick}
        >
          Reset
        </Button>
      </div>
    </Col>
  );
}

import React, { useEffect } from 'react';
import { Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedFeedTypes, getSelectedPros } from './data/selectors';
import FeedsAccordion from './Feed';
import ProAccordion from './Province';
import {
  accordionRestAllFilters,
  accordionRestFeedTypes,
  accordionRestProvinces,
} from './data/slice';
import { fetchAndRestTimelineItems } from '../data/thunks';
import _ from 'lodash';

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

    if (!selectedProvinceCount) {
      dispatch(accordionRestProvinces());
    } else if (!selectedFeedCount) {
      dispatch(accordionRestFeedTypes());
    } else {
      dispatch(fetchAndRestTimelineItems(selectedProvinces, selectedFeedTypes));
    }
  }, [selectedProvinces, selectedFeedTypes]);

  const handleRestButtonClick = () => dispatch(accordionRestAllFilters());

  return (
    <Col id="filter-feeds" sm={12} lg={3}>
      <div id="filter-by-block">
        <h1>Filter By</h1>
        <ProAccordion />
        <FeedsAccordion />
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

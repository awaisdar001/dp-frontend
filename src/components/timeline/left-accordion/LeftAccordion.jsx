import React, {useEffect, useRef} from 'react';
import {Button, Col} from 'react-bootstrap';
import {useDispatch, useSelector, useStore} from 'react-redux';
// import {shouldResetItems, restAllItems} from '../../../store_old/accordion';
// import {loadTimelineItemsFromState,} from '../../../store_old/timeline';
import {getFeedTypeItems, getProItems, getSelectedFeedTypes, getSelectedPros} from './data/selectors'
import FeedsAccordion from './Feed';
import ProAccordion from './Province';
import {accordionRestProvinces, accordionRestFeedTypes, accordionRestAllFilters} from "./data/slice";
import {fetchAndRestTimelineItems, fetchTimelineItems} from "../data/thunks";
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
    const selectedProvinceCount = _.size(selectedProvinces)
    const selectedFeedCount = _.size(selectedFeedTypes)

    if (!selectedProvinceCount) {
      dispatch(accordionRestProvinces())
    } else if (!selectedFeedCount) {
      dispatch(accordionRestFeedTypes())
    } else {
      dispatch(fetchAndRestTimelineItems(selectedProvinces, selectedFeedTypes));
    }
  }, [selectedProvinces, selectedFeedTypes]);

  const handleRestButtonClick = () => dispatch(accordionRestAllFilters());

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

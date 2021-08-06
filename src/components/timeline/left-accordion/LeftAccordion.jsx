import React, { useEffect, useRef } from 'react';
import { Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector, useStore } from 'react-redux';
import {shouldResetItems, getProsItems, getFeedItems, resetAllItems } from '../../../store_old/accordion';
import { loadTimelineItemsFromState,  } from '../../../store_old/timeline';
import FeedsAccordion from './Feed';
import ProAccordion from './Province';

/**
 * Accordion component for showing checkboxes for quick filtering of timelne
 *
 */
export default function DPAccordion() {
  const dispatch = useDispatch();
  const mounted = useRef();
  const store = useStore();

  const proItems = useSelector(getProsItems);
  const feedTypesItems = useSelector(getFeedItems);

  // Rest timeline items when pro/feed items change
  useEffect(() => {
    if (mounted.current) {
      const shouldReset = shouldResetItems(store.getState());
      if (shouldReset === true) {
        dispatch(restAllItems());
      } else {
        dispatch(loadTimelineItemsFromState());
      }
    } else mounted.current = true;
  }, [proItems, feedTypesItems, dispatch, store]);

  const handleRestButtonClick = () => dispatch(resetAllItems());

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

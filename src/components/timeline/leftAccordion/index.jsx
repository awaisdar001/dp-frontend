import { useEffect, useRef } from 'react';
import { Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector, useStore } from 'react-redux';
import {
  getFeedItems,
  getProsItems,
  restAllItems,
  shouldResetItems,
} from '../../../store/accordion';
import { loadTimelineItemsFromState } from '../../../store/timeline';
import FeedsAccordion from '../../timeline/leftAccordion/feedAccordion';
import ProAccordion from '../../timeline/leftAccordion/proAccordion';

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

  const handleRestButtonClick = () => dispatch(restAllItems());

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

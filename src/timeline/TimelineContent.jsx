import React, { useEffect, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';

import { FeedsPlaceholder, LoadingNewFeeds } from '../common';
import {
  getLoadingStatus,
  getLoadingStatusNextPage,
  getNextPage,
  getPreviousPage,
  getTimelineFeeds,
} from './data/selectors';
import { fetchTimelineNextPage } from './data/thunks';
import { getSelectedFeedTypes, getSelectedPros } from './left-accordion/data/selectors';
import TimelinePagination from './Pagination';
import TimelineCards from './TimelineCards';

const TimelineContent = () => {
  const dispatch = useDispatch();
  const { ref, inView, entry } = useInView({
    threshold: 1,
  });
  const isLoading = useSelector(getLoadingStatus);
  const isLoadingNextPage = useSelector(getLoadingStatusNextPage);
  const items = useSelector(getTimelineFeeds);
  const nextPage = useSelector(getNextPage);
  const previousPage = useSelector(getPreviousPage);

  useEffect(() => {
    if (inView === true && nextPage?.url) {
      dispatch(fetchTimelineNextPage({ pageUrl: nextPage.url }));
    }
  }, [dispatch, inView, nextPage?.url]);

  return (
    <Col sm={12} lg={6} as="main" id="dp-timeline">
      {isLoading ? <FeedsPlaceholder /> : null}

      {items && <TimelineCards items={items} />}

      {isLoadingNextPage && <LoadingNewFeeds />}

      <div className="d-flex justify-content-center bd-highlight mb-3">
        <Row>
          <Col md={12}>
            {!isLoadingNextPage && (
              <TimelinePagination next={nextPage} previous={previousPage} nextPageElement={ref} />
            )}
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default TimelineContent;

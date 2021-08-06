import React, { useCallback, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimelineItems } from './data/thunks';

import { FeedsPlaceholder, LoadingNewFeeds } from '../placeholders';
import TimelinePagination from './Pagination';
import TimelineCards from './TimelineCards';
import {
  getSelectedFeedTypes,
  getSelectedPros,
} from './left-accordion/data/selectors';
import {
  getLoadingStatus,
  getNextPage,
  getPreviousPage,
  getTimelineFeeds,
} from './data/selectors';

const TimelineContent = () => {
  const [loadingNewFeeds, setLoadingNewFeeds] = useState(false);
  const observer = useRef();

  const loading = useSelector(getLoadingStatus);
  const items = useSelector(getTimelineFeeds);
  const nextPage = useSelector(getNextPage);
  const previousPage = useSelector(getPreviousPage);
  const selectedPros = useSelector(getSelectedPros);
  const selectedFeedTypes = useSelector(getSelectedFeedTypes);

  const dispatch = useDispatch();
  const nextPageElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setLoadingNewFeeds(true);
          dispatch(
            fetchTimelineItems(
              selectedPros,
              selectedFeedTypes,
              nextPage.pageNumber,
            ),
          );
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading],
  );

  return (
    <Col sm={12} lg={6} as="main" id="dp-timeline">
      {loading ? <FeedsPlaceholder /> : null}
      {items && <TimelineCards items={items} />}

      {loading && loadingNewFeeds && <LoadingNewFeeds />}
      {items && (
        <div className="d-flex justify-content-center bd-highlight mb-3">
          <Row>
            <Col md={12}>
              {nextPage ? (
                <TimelinePagination
                  next={nextPage}
                  previous={previousPage}
                  nextPageElement={nextPageElement}
                />
              ) : (
                <span>You have reached at the end of the feeds.</span>
              )}
            </Col>
          </Row>
        </div>
      )}
    </Col>
  );
};

export default TimelineContent;
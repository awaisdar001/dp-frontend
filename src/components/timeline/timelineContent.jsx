import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useStore, useSelector } from 'react-redux';
import {
  fetchTimelineItems,
  fetchTimelineNextPage,
  getAllFeedResults,
  getPaginatoinNextParams,
  getPaginatoinPreviousParams,
} from '../../store/timeline';
import { getLoading } from '../../store/timeline';
import {
  FeedsPlaceholder, LoadingNewFeeds,
} from '../placeholders';
import TimelinePagination from './Pagination';
import TimelineCards from './TimelineCards';

const TimelineContent = () => {
  const observer = useRef();
  const store = useStore();
  const state = store.getState();
  const dispatch = useDispatch();
  const loading = useSelector((state) => getLoading(state));

  // Selectors
  const results = getAllFeedResults(state);
  const nextPage = getPaginatoinNextParams(state);
  const previousPage = getPaginatoinPreviousParams(state);

  // local state
  const [loadingNewFeeds, setLoadingNewFeeds] = useState(false);

  const nextPageElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const newURL = entries[0].target.href;
          setLoadingNewFeeds(true);
          dispatch(fetchTimelineNextPage(newURL));
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, dispatch]
  );

  useEffect(() => {
    dispatch(fetchTimelineItems());
  }, [dispatch]);

  return (
    <Col sm={12} lg={6} as="main" id="dp-timeline">
      {loading ? <FeedsPlaceholder /> : null}
      {results.length !== 0 && <TimelineCards items={results} />}

      {loading && loadingNewFeeds && <LoadingNewFeeds />}
      {results.length !== 0 && (
        <div className="d-flex justify-content-center bd-highlight mb-3">
          <Row>
            <Col md={12}>
              {nextPage && nextPage.has_next ? (
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

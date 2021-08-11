import React from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import PopBlogs from './PopBlogs';
import PopPhotos from './PopPhotos';
import PopQuestions from './PopQuestions';
import PopUpdates from './PopUpdates';
import PopVideos from './PopVideos';
import { fetchPopularTimelineItems } from './data/thunks';

const RightMenuBar = () => {
  const dispatch = useDispatch();
  dispatch(fetchPopularTimelineItems());

  return (
    <Col id="tl-popular-feeds" className="right-col d-none d-lg-block" md={3}>
      <PopPhotos />
      <PopVideos />
      <PopBlogs />
      <PopUpdates />
      <PopQuestions />
    </Col>
  );
};

export default RightMenuBar;

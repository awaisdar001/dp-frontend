import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchPopularTimelineItems } from '../../../store_old/popular-feeds';
import PopBlogs from './PopBlogs';
import PopPhotos from './PopPhotos';
import PopQuestions from './PopQuestions';
import PopUpdates from './PopUpdates';
import PopVideos from './PopVideos';

const RightMenuBar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularTimelineItems());
  }, [dispatch]);

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

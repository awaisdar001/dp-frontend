import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchPopularTimelineItems } from '../../../store/popularFeeds';
import PopBlogs from './popBlogs';
import PopPhotos from './popPhotos';
import PopQuestions from './popQuestions';
import PopUpdates from './popUpdates';
import PopVideos from './popVideos';

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

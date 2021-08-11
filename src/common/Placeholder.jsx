import React from 'react';
import {Col, Row} from 'react-bootstrap';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';

export const TimelinePlaceHolder = () => {
  return (
    <SkeletonTheme color="#ddd" highlightColor="#eeeeee">
      <div className="item" key={`placeholder`}>
        <div className="cbp_tmlabel">
          <Row>
            <Col md={12}>
              <Skeleton
                count={1}
                duration={2}
                height={40}
                style={{marginBottom: '10px'}}
              />
            </Col>
            <Col md={12}>
              <Skeleton count={6} duration={2}/>
            </Col>
            <Col md={12}>
              <Skeleton
                count={1}
                duration={2}
                height={400}
                style={{marginTop: '10px', marginBottom: '10px'}}
              />
            </Col>
            <Col>
              <Skeleton count={1} duration={2} height={40}/>
            </Col>
          </Row>
        </div>
      </div>
    </SkeletonTheme>
  );
};


export const FeedsPlaceholder = () => (
  <div className="reset-feeds">
    <PlaceHolder/>;
    <PlaceHolder/>
  </div>
);

export const LoadingNewFeeds = () => (
  <div className="loading-feeds">
    <PlaceHolder/>
  </div>
);

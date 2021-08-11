import React from 'react';
import { Col } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { ProgressiveImage } from '../../common';
import { getLoading, getPopularPhotos } from './data/selectors';

const FavPhoto = ({ imageUrls, name, absUrl }) => {
  return (
    <Col xs={4} className="pop-image">
      <div className="list-item-sm">
        <a className="dp-hover-opacity" href={absUrl} title={name}>
          {/* <Image src={imageUrls.original} alt={name} fluid rounded /> */}
          <ProgressiveImage
            className="img-fluid"
            thumbnailHDSrc={imageUrls.original}
            thumbnailSMSrc={imageUrls.thumbnail}
            alt={name}
          />
        </a>
      </div>
    </Col>
  );
};

const PhotoPlaceHolder = () => (
  <div className="rmb-placeholder">
    <div className="row">
      {Array.from({ length: 9 }, (_, _key) => (
        <Col key={`pop-photos-skeleton-${_key}`} xs={4} className="pop-image">
          <Skeleton
            count={1}
            duration={2}
            height={40}
            style={{ marginBottom: '10px' }}
          />
        </Col>
      ))}
    </div>
  </div>
);

const PopularPhotos = ({ data }) => {
  return (
    <div className="row gallery-list mb-5">
      {data.map((photo, index) => {
        return <FavPhoto key={`fav-photos-${index}`} {...photo} />;
      })}
    </div>
  );
};

export default () => {
  const popPhotos = useSelector(getPopularPhotos);
  const isLoading = useSelector(getLoading);

  return (
    <div id="pop-photos">
      <div className="headline">
        <h2>Popular photos</h2>
      </div>
      {isLoading ? (
        <PhotoPlaceHolder />
      ) : (
        popPhotos && <PopularPhotos data={popPhotos} />
      )}
    </div>
  );
};

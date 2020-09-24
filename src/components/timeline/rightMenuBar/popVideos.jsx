import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import ProgressiveImage from "../../common/progressiveImage";
import { useStore, useSelector } from "react-redux";
import { getPopularVideos, getLoading } from "../../../store/popularFeeds";

const PopVideoPlaceHolder = () => {
  return (
    <div className="rmb-placeholder" key={`placeholder`}>
      <div className="row">
        {Array.from({ length: 3 }, (_, _key) => (
          <Col key={`pop-videos-skeleton-${_key}`} xs={12} className="p-0">
            <Skeleton count={1} duration={2} height={180} />
            <Skeleton
              count={1}
              duration={2}
              height={60}
              style={{ marginBottom: "30px" }}
            />
          </Col>
        ))}
      </div>
    </div>
  );
};

const PopVideo = ({ name, abs_url: absUrl, poster_urls: posterUrls }) => {
  return (
    <Col xs={12}>
      <article className="item margin-bottom-15">
        <div className="thumbnail no-margin">
          <div className="full-img-thumb video_thumb">
            <a className="normal" title={name} href={absUrl}>
              <ProgressiveImage
                className="img-fluid"
                thumbnailHDSrc={posterUrls.thumbnail_lg}
                thumbnailSMSrc={posterUrls.thumbnail_md}
                alt={name}
              />
            </a>
            <a className="icon-post-format" href={absUrl}>
              <FontAwesomeIcon icon="play" />
            </a>
          </div>
        </div>
        <div className="video-caption">
          <h5>
            <a className="normal" href={absUrl}>
              {name}
            </a>
          </h5>
        </div>
      </article>
    </Col>
  );
};
const PopularVideos = ({ data }) => {
  return (
    <div className="row video-with-caption mb-5">
      {data.map((video, index) => {
        return <PopVideo key={`fav-video-${index}`} {...video} />;
      })}
    </div>
  );
};
export default () => {
  const store = useStore();
  const popVideos = getPopularVideos(store.getState());
  const loading = useSelector((state) => getLoading(state));

  return (
    <div id="pop-videos">
      <div className="headline">
        <h2>Popular videos</h2>
      </div>
      {loading && <PopVideoPlaceHolder />}
      {!loading && popVideos && <PopularVideos data={popVideos} />}
    </div>
  );
};

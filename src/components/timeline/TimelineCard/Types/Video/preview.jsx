import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col } from "react-bootstrap";
import ProgressiveImage from "../../../../common/progressiveImage";

export default function VideoPreview(instance) {
  const { name, abs_url: absUrl, poster_urls: posterUrls } = instance;
  return (
    <Col md={12} className="video-without-caption">
      <article>
        <div className="thumbnail">
          <div className="full-img-thumb video_thumb">
            <a className="normal" title={name} href={absUrl}>
              <ProgressiveImage
                className="img-fluid rounded"
                alt={name}
                thumbnailHDSrc={posterUrls.thumbnail_lg}
                thumbnailSMSrc={posterUrls.thumbnail_md}
              />
            </a>
            <a className="icon-post-format" href={absUrl}>
              <FontAwesomeIcon icon="play" />
            </a>
          </div>
        </div>
      </article>
    </Col>
  );
}

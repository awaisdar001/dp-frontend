import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col } from 'react-bootstrap';
import { ProgressiveImage } from '../../../../components/common';

export default function VideoPreview({ name, absUrl, posterUrls }) {
  return (
    <Col md={12} className="video-without-caption">
      <article>
        <div className="thumbnail">
          <div className="full-img-thumb video_thumb">
            <a className="normal" title={name} href={absUrl}>
              <ProgressiveImage
                className="img-fluid rounded"
                alt={name}
                thumbnailHDSrc={posterUrls.thumbnailLg}
                thumbnailSMSrc={posterUrls.thumbnailMd}
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

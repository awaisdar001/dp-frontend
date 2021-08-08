import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { ProgressiveImage } from '../../../../components/common';
import Footer from '../../Footer';
import Header from '../../Header';
import Tags from '../../Tags';
import Description from './Description';

export default function ImageCard({ instance, card }) {
  const {
    name,
    description,
    city,
    pro,
    tags,
    absUrl,
    imageUrls,
    createdAt,
    seenCount,
  } = instance;
  const { profileURL, nodeURL, isNew } = card;
  const propsHeader = { profileURL, nodeURL, isNew, icon: 'image' };
  const propsTags = { city, pro, tags };
  const propsFooter = { absUrl, createdAt, seenCount };

  return (
    <div className="cbp_tmlabel">
      <Header title={card.name} username={card.fullName} {...propsHeader} />

      <Row>
        <Description description={name} />
        <Tags {...propsTags} />
        <Col md={12}>
          <a href={absUrl} title={description}>
            <ProgressiveImage
              className="img-fluid rounded"
              thumbnailSMSrc={imageUrls.thumbnail}
              thumbnailHDSrc={imageUrls.original}
            />
          </a>
        </Col>
        <Footer {...propsFooter} />
      </Row>
    </div>
  );
}

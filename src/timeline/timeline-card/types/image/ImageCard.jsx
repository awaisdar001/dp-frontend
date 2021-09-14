import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { ProgressiveImage } from '../../../../common';
import { useModel } from '../../../../generic/model-store';
import Footer from '../../Footer';
import Header from '../../Header';
import Tags from '../../Tags';
import Description from './Description';

export default function ImageCard({ instance, card }) {
  const { tags, absUrl, imageUrls, createdAt, seenCount } = instance;
  // const { profileURL, nodeURL, isNew } = card;
  const { isNew } = card;

  const { fullName, profileURL } = useModel('user', card.user);
  const { name: headerTitle } = useModel('state', card.state);
  const city = useModel('city', instance.city);
  const pro = useModel('pro', instance.pro);

  const propsHeader = {
    profileURL,
    absUrl,
    isNew,
    title: headerTitle,
    username: fullName,
    icon: 'image',
  };
  const propsFooter = { absUrl, createdAt, seenCount };
  const propsTags = { city, pro, tags };

  return (
    <div className="cbp_tmlabel">
      <Header {...propsHeader} />

      <Row>
        <Description description={instance.name} />
        <Tags {...propsTags} />
        <Col md={12}>
          <a href={absUrl} title={instance.description}>
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

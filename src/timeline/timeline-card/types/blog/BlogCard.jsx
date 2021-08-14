import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import Description from './Description';
import Footer from '../../Footer';
import Tags from './Tags';
import Header from '../../Header';
import { useModel } from '../../../../generic/model-store';

export default function BlogCard({ instance, card }) {
  const { name, description, category, tags, absUrl, createdAt, seenCount } =
    instance;
  const { isNew } = card;

  const { fullName, profileURL } = useModel('user', card.user);
  const { name: title } = useModel('state', card.state);
  const pro = useModel('pro', instance.pro);

  const propsHeader = { profileURL, absUrl, isNew };
  const propsDescription = { name, description, absUrl };
  const propsTags = { category, pro, tags };
  const propsFooter = { createdAt, seenCount, absUrl };

  return (
    <div className="cbp_tmlabel">
      <Header title={title} username={fullName} icon="book" {...propsHeader} />

      <Row>
        <Description {...propsDescription} />
        <Tags {...propsTags} />
        <Col md={12}>
          <a href={absUrl} title={description}>
            <Image
              src={'https://destinationpak.com/' + instance.banner}
              rounded
              fluid
            />
          </a>
        </Col>

        <Footer {...propsFooter} />
      </Row>
    </div>
  );
}

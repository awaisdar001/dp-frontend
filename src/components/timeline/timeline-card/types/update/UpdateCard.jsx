import React from 'react';
import { Row } from 'react-bootstrap';
import Footer from '../../Footer';
import Header from '../../Header';
import Tags from '../../Tags';
import UpdateBody from './Description';

export default function CardUpdate({ instance, card }) {
  const { fullName, profileURL, nodeURL, is_new } = card;
  const {
    name,
    description,
    city,
    pro,
    tags,
    abs_url: absUrl,
    created_at: createdAt,
    seen_count: seenCount,
  } = instance;

  const propsHeader = { profileURL, nodeURL, is_new, icon: 'envelope' };
  const propsBody = { name, description, nodeURL };
  const propsTags = { city, pro, tags, map: false };
  const propsFooter = { absUrl, createdAt, seenCount };
  return (
    <div className="cbp_tmlabel">
      <Header title={card.name} username={fullName} {...propsHeader} />
      <Row>
        <UpdateBody {...propsBody} />
        <Tags {...propsTags} />
        <Footer {...propsFooter} />
      </Row>
    </div>
  );
}

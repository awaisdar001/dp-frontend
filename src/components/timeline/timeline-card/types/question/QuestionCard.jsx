import React from 'react';
import { Row } from 'react-bootstrap';
import Footer from '../../Footer';
import Header from '../../Header';
import Tags from '../../Tags';
import QuestionTitle from './Description';

export default function CardQuestion({ card, instance }) {
  const {
    name,
    city,
    pro,
    abs_url: absUrl,
    created_at: createdAt,
    seen_count: seenCount,
  } = instance;
  const { nodeURL, is_new, profileURL } = card;

  const propsHeader = { profileURL, nodeURL, is_new, icon: 'question-circle' };
  const propsTags = { city, pro, map: false };
  const propsFooter = { absUrl, createdAt, seenCount };
  return (
    <div className="cbp_tmlabel">
      <Header title={card.name} username={card.fullName} {...propsHeader} />
      <Row>
        <QuestionTitle name={name} nodeURL={nodeURL} />
        <Tags {...propsTags} />
        <Footer {...propsFooter} />
      </Row>
    </div>
  );
}

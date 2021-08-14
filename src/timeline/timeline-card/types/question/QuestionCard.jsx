import React from 'react';
import { Row } from 'react-bootstrap';
import Footer from '../../Footer';
import Header from '../../Header';
import Tags from '../../Tags';
import QuestionTitle from './Description';
import { useModel } from '../../../../generic/model-store';

export default function CardQuestion({ card, instance }) {
  const { name, absUrl, createdAt, seenCount } = instance;
  const { isNew } = card;

  const { fullName, profileURL } = useModel('user', card.user);
  const { name: title } = useModel('state', card.state);
  const city = useModel('city', instance.city);
  const pro = useModel('pro', instance.pro);

  const propsHeader = {
    title,
    profileURL,
    absUrl,
    isNew,
    icon: 'question-circle',
    username: fullName,
  };
  const propsTags = { city, pro, map: false };
  const propsFooter = { absUrl, createdAt, seenCount };
  return (
    <div className="cbp_tmlabel">
      <Header {...propsHeader} />
      <Row>
        <QuestionTitle name={name} absUrl={absUrl} />
        <Tags {...propsTags} />
        <Footer {...propsFooter} />
      </Row>
    </div>
  );
}

import React from 'react';
import { Row } from 'react-bootstrap';

import { useModel } from '../../../../generic/model-store';
import Footer from '../../Footer';
import Header from '../../Header';
import Tags from '../../Tags';
import UpdateBody from './Description';

export default function CardUpdate({ instance, card }) {
  const { isNew } = card;
  const { name, description, tags, absUrl, createdAt, seenCount } = instance;

  const { fullName, profileURL } = useModel('user', card.user);
  const { name: title } = useModel('state', card.state);
  const pro = useModel('pro', instance.pro);

  const propsHeader = {
    title,
    profileURL,
    absUrl,
    isNew,
    icon: 'envelope',
    username: fullName,
  };
  const propsBody = { name, description, absUrl };
  const propsTags = { pro, tags, map: false };
  const propsFooter = { absUrl, createdAt, seenCount };
  return (
    <div className="cbp_tmlabel">
      <Header {...propsHeader} />
      <Row>
        <UpdateBody {...propsBody} />
        <Tags {...propsTags} />
        <Footer {...propsFooter} />
      </Row>
    </div>
  );
}

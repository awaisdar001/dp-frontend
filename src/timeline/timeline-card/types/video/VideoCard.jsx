import React from 'react';
import { Row } from 'react-bootstrap';
import Footer from '../../Footer';
import Header from '../../Header';
import Tags from '../../Tags';
import VideoPreview from './Preview';
import VideoDescription from './Description';
import { useModel } from '../../../../generic/model-store';

export default function VideoCard({ instance, card }) {
  const { absUrl, createdAt, seenCount, tags, name, description } = instance;
  // const { nodeURL, isNew, profileURL } = card;
  const { isNew } = card;

  const { fullName, profileURL } = useModel('user', card.user);
  const { name: title } = useModel('state', card.state);
  const city = useModel('city', instance.city);
  const pro = useModel('pro', instance.pro);

  const propsVideoDescription = { name, description, absUrl };
  const propsHeader = {
    title,
    profileURL,
    absUrl,
    isNew,
    username: fullName,
    icon: 'video',
  };
  const propsTags = { city, pro, tags };
  const propsFooter = { absUrl, createdAt, seenCount };

  return (
    <div className="cbp_tmlabel">
      <Header {...propsHeader} />
      <Row>
        <VideoDescription {...propsVideoDescription} />
        <Tags {...propsTags} map={false} />
        {/* const propsVideoEmbed = { instance.source, instance.videoUrl };
         <VideoEmbed {...propsVideoEmbed} /> */}
        <VideoPreview {...instance} />
        <Footer {...propsFooter} />
      </Row>
    </div>
  );
}

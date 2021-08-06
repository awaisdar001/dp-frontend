import React from 'react';
import { Row } from 'react-bootstrap';
import Footer from '../../Footer';
import Header from '../../Header';
import Tags from '../../Tags';
import VideoPreview from './Preview';
import VideoDescription from './Description';

export default function CardVideo({ instance, card }) {
  const { absUrl, createdAt, seenCount, city, pro, tags, name, description } =
    instance;
  const { nodeURL, isNew, profileURL } = card;

  const propsFooter = { absUrl, createdAt, seenCount };
  const propsTags = { city, pro, tags };

  const propsVideoDescription = { name, description, nodeURL };
  const propsHeader = { profileURL, nodeURL, isNew };

  return (
    <div className="cbp_tmlabel">
      <Header
        title={card.name}
        username={card.fullName}
        icon="video"
        {...propsHeader}
      />
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

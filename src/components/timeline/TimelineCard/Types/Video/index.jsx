import React from "react";
import { Row } from "react-bootstrap";
import CardFooter from "../../cardFooter";
import CardHeader from "../../cardHeader";
import CardTags from "../../cardTags";
import VideoPreview from "./preview";
import VideoDescription from "./description";

export default function CardVideo(props) {
  const { instance, card } = props;
  const {
    // CardFooter
    abs_url: absUrl,
    created_at: createdAt,
    seen_count: seenCount,
    // VideoTags
    city,
    pro,
    tags,
    // VideoDescription
    name,
    description,
  } = instance;
  const { nodeURL, is_new, profileURL } = card;

  const propsFooter = { absUrl, createdAt, seenCount };
  const propsTags = { city, pro, tags };

  const propsVideoDescription = { name, description, nodeURL };
  const propsHeader = { profileURL, nodeURL, is_new };

  return (
    <div className="cbp_tmlabel">
      <CardHeader
        title={card.name}
        username={card.fullName}
        icon="video"
        {...propsHeader}
      />
      <Row>
        <VideoDescription {...propsVideoDescription} />
        <CardTags {...propsTags} map={false} />
        {/* const propsVideoEmbed = { instance.source, instance.videoUrl };
         <VideoEmbed {...propsVideoEmbed} /> */}
        <VideoPreview {...instance} />
        <CardFooter {...propsFooter} />
      </Row>
    </div>
  );
}

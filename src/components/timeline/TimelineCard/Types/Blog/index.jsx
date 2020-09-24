import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import CardDescription from "./cardDescription";
import CardFooter from "../../cardFooter";
import CardTags from "./cardTags";
import CardHeader from "../../cardHeader";

export default function CardBlog({ instance, card }) {
  const {
    name,
    description,
    category,
    pro,
    tags,
    abs_url: absUrl,
    created_at: createdAt,
    seen_count: seenCount,
  } = instance;
  const { nodeURL, is_new, profileURL } = card;

  const propsHeader = { profileURL, nodeURL, is_new };
  const propsDescription = { name, description, nodeURL };
  const propsTags = { category, pro, tags };
  const propsFooter = { createdAt, seenCount, absUrl };

  return (
    <div className="cbp_tmlabel">
      <CardHeader
        title={card.name}
        username={card.fullName}
        icon="book"
        {...propsHeader}
      />

      <Row>
        <CardDescription {...propsDescription} />
        <CardTags {...propsTags} />
        <Col md={12}>
          <a href={absUrl} title={description}>
            <Image
              src={"https://destinationpak.com/" + instance.banner}
              rounded
              fluid
            />
          </a>
        </Col>

        <CardFooter {...propsFooter} />
      </Row>
    </div>
  );
}

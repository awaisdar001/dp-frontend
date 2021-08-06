import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col } from 'react-bootstrap';

export default function Tags({ city, pro, tags }) {
  const faMap = (
    <FontAwesomeIcon className="margin-right-3" icon="map-marker-alt" />
  );
  const Tags = ({ tags }) => {
    return tags
      ? tags.map((tag, index) => (
          <a key={`tag-${tag.name}-${index}`} href={tag.url}>
            <FontAwesomeIcon icon="tags" /> {tag.name}
          </a>
        ))
      : null;
  };

  const TagPro = ({ pro }) => {
    return pro && pro.slug && pro.name ? (
      <a id="tag-pro" href={pro.absUrl}>
        {faMap}
        {pro.name}
      </a>
    ) : null;
  };

  const TagCity = ({ city }) => {
    return city && city.absUrl && city.name ? (
      <a id="tag-city" href={city.absUrl}>
        {faMap}
        {city.name}
      </a>
    ) : null;
  };

  const TagMap = ({ map }) => {
    return map ? (
      <a href="/">
        <FontAwesomeIcon className="margin-right-3" icon="map-marked-alt" />
      </a>
    ) : null;
  };

  return (
    <Col md={12}>
      <p className="timeline-tags">
        <TagCity city={city} />
        <TagPro pro={pro} />
        <Tags tags={tags} />
        <TagMap />
      </p>
    </Col>
  );
}

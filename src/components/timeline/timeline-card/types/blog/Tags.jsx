import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {Col} from 'react-bootstrap';

const Tags = ({category, pro, tags}) => {
  const faMap = (
    <FontAwesomeIcon className="margin-right-3" icon="map-marker-alt"/>
  );
  const Tags = ({tags}) => {
    return tags
      ? tags.map((tag, index) => (
        <a key={`tag-${tag.name}-${index}`} href={tag.url}>
          <FontAwesomeIcon icon="tags"/> {tag.name}
        </a>
      ))
      : null;
  };

  const TagPro = ({pro}) => {
    const isValidValue = pro && pro.absUrl && pro.name;
    return isValidValue ? (
      <a id="tag-pro" href={pro.absUrl}>
        {faMap} {pro.name}
      </a>
    ) : null;
  };

  const TagCategory = ({category}) => {
    return category && category.absUrl && category.name ? (
      <a id="tag-category" href={category.abs_url}>
        <FontAwesomeIcon className="margin-right-3" icon="eye"/>
        {category.name}
      </a>
    ) : null;
  };

  const TagMap = (props) => {
    return props.map ? (
      <a href="/">
        <FontAwesomeIcon className="margin-right-3" icon="map-marked-alt"/>
      </a>
    ) : null;
  };
  return (
    <Col md={12}>
      <p className="timeline-tags">
        <TagPro pro={pro}/>
        <TagCategory category={category}/>
        <Tags tags={tags}/>
        <TagMap/>
      </p>
    </Col>
  );
};

export default Tags;

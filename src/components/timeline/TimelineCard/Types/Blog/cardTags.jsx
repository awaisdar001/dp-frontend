import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col } from 'react-bootstrap';

const CardTags = (props) => {
  const { category, pro, tags } = props;
  const faMap = (
    <FontAwesomeIcon className="margin-right-3" icon="map-marker-alt" />
  );
  const Tags = (props) => {
    return props.tags
      ? props.tags.map((tag, index) => (
          <a key={`tag-${tag.name}-${index}`} href={tag.url}>
            <FontAwesomeIcon icon="tags" /> {tag.name}
          </a>
        ))
      : null;
  };

  const TagPro = (props) => {
    const { pro } = props;
    const isValidValue = pro && pro.abs_url && pro.name;
    return isValidValue ? (
      <a id="tag-pro" href={pro.abs_url}>
        {faMap} {pro.name}
      </a>
    ) : null;
  };

  const TagCategory = (props) => {
    const { category } = props;
    return category && category.abs_url && category.name ? (
      <a id="tag-category" href={category.abs_url}>
        <FontAwesomeIcon className="margin-right-3" icon="eye" />
        {category.name}
      </a>
    ) : null;
  };

  const TagMap = (props) => {
    return props.map ? (
      <a href="/">
        <FontAwesomeIcon className="margin-right-3" icon="map-marked-alt" />
      </a>
    ) : null;
  };
  return (
    <Col md={12}>
      <p className="timeline-tags">
        <TagPro pro={pro} />
        <TagCategory category={category} />
        <Tags tags={tags} />
        <TagMap />
      </p>
    </Col>
  );
};

export default CardTags;

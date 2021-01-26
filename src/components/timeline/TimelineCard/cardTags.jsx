import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col } from 'react-bootstrap';

export default function CardTags(props) {
  const { city, pro, tags } = props;
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
    return pro && pro.slug && pro.name ? (
      <a id="tag-pro" href={pro.abs_url}>
        {faMap}
        {pro.name}
      </a>
    ) : null;
  };

  const TagCity = (props) => {
    const { city } = props;
    return city && city.abs_url && city.name ? (
      <a id="tag-city" href={city.abs_url}>
        {faMap}
        {city.name}
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
        <TagCity city={city} />
        <TagPro pro={pro} />
        <Tags tags={tags} />
        <TagMap />
      </p>
    </Col>
  );
}

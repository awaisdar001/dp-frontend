import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useModel, useModels } from '../../../generic/model-store';

export default function TripCategories({ primary, tripCategories }) {
  const categories = useModels('category', tripCategories);
  const primaryCategory = useModel('category', primary);

  return (
    <li className="item">
      <Row>
        <Col lg={2} as="h5" className="item-heading">
          Category
        </Col>
        <Col lg={10} className="item-value">
          <ul>
            {<li className="tick primary">{primaryCategory.name}</li>}
            {categories &&
              Object.keys(categories).map((categoryId) => (
                <li key={categoryId} className="tick trip-category">{categories[categoryId].name}</li>
              ))}
          </ul>
        </Col>
      </Row>
    </li>
  );
}

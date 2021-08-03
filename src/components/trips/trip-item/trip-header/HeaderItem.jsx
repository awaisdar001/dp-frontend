import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { Link } from 'react-scroll';

const TripsHeader = ({ items, handleOnClick, activeItem }) => {
  const TripHeaderItem = ({ slug, label, icon }) => (
    <Col as="li" className={'p-0' + (slug === activeItem ? ' active' : '')}>
      <Link
        to={slug}
        spy={true}
        smooth={true}
        offset={-100}
        duration={500}
        onSetActive={handleOnClick}
      >
        <FontAwesomeIcon icon={icon} className="mr-2" />
        <span>{label}</span>
      </Link>
    </Col>
  );

  return (
    <div className="header-wrapper sticky">
      <div className="header-params">
        <Row as="ul" className="header-list p-0">
          {items.map((sortItem) => {
            const { slug } = sortItem;
            const id = `id-${slug}`;
            return (
              <TripHeaderItem
                {...sortItem}
                id={id}
                key={'sorting-item-' + slug}
              />
            );
          })}
        </Row>
      </div>
    </div>
  );
};
export default TripsHeader;

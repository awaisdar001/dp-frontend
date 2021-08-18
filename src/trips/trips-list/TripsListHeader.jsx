import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {Col, Row} from "react-bootstrap";
import classNames from "classnames";

const TripsListHeader = ({items, active, onChange}) => {
  const handleClick = (id) => {
    onChange(id);
  };

  return (
    <div className="header-wrapper">
      <div className="header-params">
        <Row as="ul" className="header-list p-0">
          {items.map(({id, label, icon, slug}) => (
            <Col as="li"
                 key={`sorting-item-${id}`}
                 className={
                   classNames(
                     'p-0',
                     {'active': active === id}
                   )
                 }
                 onClick={() => handleClick(id)}
            >
              <a href={`#${slug}`}>
                <FontAwesomeIcon icon={icon} className="mr-2"/>
                <span>{label}</span>
              </a>
            </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};

export default TripsListHeader;

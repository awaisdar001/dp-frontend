import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Row } from "react-bootstrap";

const TripsListHeader = ({ items, activeItem }) => {
  const [activeLink, setActiveLink] = React.useState(activeItem);
  const handleOnClick = (e, id) => {
    setActiveLink(id);
  };

  const Item = ({ id, label, icon }) => (
    <Col
      as="li"
      className={"p-0" + (id === activeLink ? " active" : "")}
      onClick={(e) => handleOnClick(e, id)}
    >
      <a href={`#${id}`}>
        <FontAwesomeIcon icon={icon} className="mr-2" />
        <span>{label}</span>
      </a>
    </Col>
  );

  return (
    <div className="header-wrapper">
      <div className="header-params">
        <Row as="ul" className="header-list p-0">
          {items.map((sortItem) => (
            <Item {...sortItem} key={"sorting-item-" + sortItem.id} />
          ))}
        </Row>
      </div>
    </div>
  );
};

export default TripsListHeader;

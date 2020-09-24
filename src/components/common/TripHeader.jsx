import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Row } from "react-bootstrap";

const TripsHeader = ({ items }) => {
  const [activeLink, setActiveLink] = React.useState(1);
  const handleOnClick = (e, id) => {
    setActiveLink(id);
  };

  const TripHeaderItem = ({ id, label, icon }) => (
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
          {items.map((sortItem) => {
            const id = sortItem.label.toLowerCase().replace(" ", "-");
            return (
              <TripHeaderItem
                {...sortItem}
                id={id}
                key={"sorting-item-" + id}
              />
            );
          })}
        </Row>
      </div>
    </div>
  );
};
export default TripsHeader;

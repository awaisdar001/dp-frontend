import React from "react";
import { Container } from "react-bootstrap";
import TripsHeader from "../../common/TripHeader";
import Content from "./Content";
import Cover from "./Cover/";

export default function Trips() {
  const items = [
    { id: 1, label: "Date", icon: "calendar" },
    { id: 2, label: "Price Low to High", icon: "arrow-circle-up" },
    { id: 3, label: "Price High to Low", icon: "arrow-circle-down" },
    { id: 4, label: "Name (A - Z)", icon: "pencil-alt" },
  ];
  return (
    <>
      <Cover />
      <Container fluid>
        <div className="dp-trips">
          <div className="search-page">
            <TripsHeader items={items} />
            <Content />
          </div>
        </div>
      </Container>
    </>
  );
}

import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectLoading } from "../../../../store/features/trips";
import Sidebar from "../SideBar";
import TripCard from "./TripCard";

const Results = () => {
  const loading = useSelector(selectLoading);
  console.log("loading", loading);
  const loadingClass = loading ? "loading" : "";
  return (
    <div className="results-wrapper">
      <Row>
        <Col lg={3}>
          <Sidebar />
        </Col>
        <Col lg={9}>
          <div className={"search-results " + loadingClass}>
            {<TripCard />}
            {<TripCard />}
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Results;

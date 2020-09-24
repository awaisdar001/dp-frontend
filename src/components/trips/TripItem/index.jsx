import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Title, TitlePrice } from "../TripCommon";
import Metadata from "../TripsList/Content/Metadata";
import BookingSideBar from "./BookingSideBar";
import CancellationPolicy from "./CancellationPolicy";
import Carousel from "./carousel";
import Facilities from "./Facilities";
import Location from "./Location";
import PostComment from "./PostComment";
import ReviewsAndRatings from "./ReviewsAndRatings";
import TourPlan from "./TourPlan";
import TripHeader from "./TripHeader";

export default function TripItem() {
  return (
    <div className="dp-trips">
      <Carousel />
      <Container fluid>
        <TripHeader />
        <div className="trip-wrapper">
          <Row>
            <Col lg={9}>
              <div class="item-detail">
                <Title
                  className="float-left"
                  name="Trip To Naran & Hunza: Khunjerab Pass"
                  url="/"
                />

                <TitlePrice className={"float-right"} price="Rs 14,449" />
                <Metadata />
                <hr />
                <div className="item-description">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris a dolor sit rutrum arcu.
                  </p>
                  <p>
                    Hunza is a mountainous valley in the Gilgit–Baltistan region
                    of Pakistan. The Hunza is situated north/west of the Hunza
                    River, at an elevation of around 2,500 meters (8,200 ft).
                    The territory of Hunza is about 7,900 square kilometers
                    (3,100 sq mi). Aliabad is the main town while Baltit is a
                    popular tourist destination because of the spectacular
                    scenery of the surrounding mountains like Ultar Sar,
                    Rakaposhi, Bojahagur Duanasir II, Ghenta Peak, Hunza Peak,
                    Passu Peak, Diran Peak and Bublimotin (Ladyfinger Peak), all
                    6,000 meters (19,685 ft) or higher.
                  </p>
                </div>
                <Facilities />
                <TourPlan />
                <CancellationPolicy />
                <Location />
                <ReviewsAndRatings />
                <PostComment />
              </div>
            </Col>
            <Col lg={3}>
              <BookingSideBar />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

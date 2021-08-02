import React from 'react';
import { Row } from 'react-bootstrap';
import Metadata from './Metadata';
import Rating from './Rating';
import { Title, TitlePrice } from '../../TripCommon';
import { Link } from 'react-router-dom';
let backgroundPoster = {
  backgroundImage:
    'url(https://wanderers.qodeinteractive.com/wp-content/uploads/2018/02/tour-1-featured-img.jpg)',
};
const ResultItem = () => {
  return (
    <Row className="m-0">
      <div className="trip-item">
        <div className="trip-item-container">
          <div className="item-poster">
            <div className="item-poster-inner">
              <Link to="/trip/1" className="img-fluid" style={backgroundPoster}>
                {/* <a href="/" className="img-fluid" style={backgroundPoster}> */}
                <img
                  src="https://wanderers.qodeinteractive.com/wp-content/uploads/2018/02/tour-1-featured-img.jpg"
                  className="img-fluid"
                  alt="Trips poster"
                />
              </Link>

              <span className="item-label-overlay">
                <span className="item-label-container">
                  <span className="item-label">fun</span>
                </span>
              </span>
            </div>
          </div>
          <div className="item-detail">
            <Title name="Trip To Naran & Hunza: Khunjerab Pass" url="/trip/1" />
            <TitlePrice price="Rs 14,449" />
            <div className="item-description">
              <p>
                Hunza is a mountainous valley in the Gilgit–Baltistan region of
                Pakistan. The Hunza is situated north/west of the Hunza River,
                at an elevation of around 2,500 meters (8,200 ft). The territory
                of Hunza is about 7,900 square kilometers (3,100 sq mi). Aliabad
                is the main town while Baltit is a popular tourist destination
                because of the spectacular scenery of the surrounding mountains
                like Ultar Sar, Rakaposhi, Bojahagur Duanasir II, Ghenta Peak,
                Hunza Peak, Passu Peak, Diran Peak and Bublimotin (Ladyfinger
                Peak), all 6,000 meters (19,685 ft) or higher.
              </p>
            </div>

            <Rating />

            <Metadata className="mt-4" />
          </div>
        </div>
      </div>
    </Row>
  );
};
export default React.memo(ResultItem);

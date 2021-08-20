import React from 'react';
import { createMarkup } from "../../utils";

const TripItem = ({ day, setHeading }) => (
  <div className="item">
    <div className="itinerary-day">
      <svg
        id="bg"
        width="70"
        height="100%"
        viewBox="0 0 150 100"
        preserveAspectRatio="none"
        style={{ position: 'absolute' }}
      >
        <path d="M0,0 h110 l40,50 l-40,50 h-110z" fill="#6ED901" />
      </svg>
      <div className="description">Day {day.day}</div>
    </div>

    <div className="cbp_tmlabel">
      {setHeading && <h2>{day.heading}</h2>}
      <p dangerouslySetInnerHTML={createMarkup(day.description)} />
    </div>
  </div>
);

function TourPlan({ tripItinerary }) {
  return (
    <div id="tour-plan" className="wrapper-block">
      <h3 className="h3">Tour Plan</h3>
      <div id="plan-timeline" className="timeline-with-label">
        {tripItinerary.map((day, idx) => (
          <TripItem key={`plan-${idx}`} day={day} setHeading={false} />
        ))}
        ;
      </div>
    </div>
  );
}

export default TourPlan;

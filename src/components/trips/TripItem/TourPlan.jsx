const TripItem = ({ description }) => {
  return (
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
        <div className="description">Day 1</div>
      </div>

      <div className="cbp_tmlabel">
        <h2>Day 1: Departure</h2>
        <p>09:00 pm Departure from Lahore - (PSO Pump Thokar Niaz Baig)</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

function TourPlan() {
  return (
    <div id="tour-plan" name="tour-plan" className="wrapper-block">
      <h3 className="h3">Tour Plan</h3>
      <div id="plan-timeline" className="timeline-with-label">
        <TripItem />
        <TripItem
          description="03:00 am Pick Islamabad members
10:00 am Breakfast at Balakot
Continue journey
Short stay in Naran , Lulusar Lake & Babusar Pass
05:00 pm Arrival in Chillas
Transfer to hotel
08:00 pm Dinner
Overnight stay in Chillas / Gonar Farm / Bunji"
        />
      </div>
    </div>
  );
}

export default TourPlan;

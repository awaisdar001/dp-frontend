import React from 'react';

function Location() {
  return (
    <div id="location" className="trip-location-wrapper wrapper-block">
      <h3 class="h3">Location</h3>
      <div>
        <iframe
          title="LocationMapOnGoogle"
          src="https://www.google.com/maps/d/embed?mid=1sIu8IYEHlajFo04FGb_AyXkyYbG9Djcn"
          width="100%"
          height="580"
          border="0"
          style={{
            border: 'none',
          }}
        ></iframe>
      </div>
    </div>
  );
}

export default Location;

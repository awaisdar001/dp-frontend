import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
import React, { useState } from 'react';

import { MapStyles } from '../../common';
import { useModel, useModels } from '../../generic/model-store';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
export default function GoogleLocation({ tripDetail }) {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const startingLocation = useModel('location', tripDetail.startingLocation);
  const tripDestination = useModel('location', tripDetail.destination);
  const tripLocations = useModels('location', tripDetail.locations);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_URL,
  });
  const center = {
    lat: tripDestination.lat,
    lng: tripDestination.lng,
  };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading google maps...';

  return (
    <div id="location" className="trip-review-wrapper wrapper-block">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        options={options}
        onClick={(e) => console.log(e)}
      >
        {startingLocation && (
          <MapMarker
            marker={startingLocation}
            handleClick={() => setSelectedMarker(startingLocation)}
          />
        )}
        {tripDestination && (
          <MapMarker
            marker={tripDestination}
            handleClick={() => setSelectedMarker(tripDestination)}
          />
        )}

        {tripLocations.map((marker) => (
          <MapMarker marker={marker} handleClick={() => setSelectedMarker(marker)} />
        ))}
        {selectedMarker && (
          <MapInfoWindow
            selected={selectedMarker}
            handleCloseClick={() => setSelectedMarker(null)}
            infoBody={
              <p>
                Trip Location: <b>{`${selectedMarker.name}.`}</b>
              </p>
            }
          />
        )}
      </GoogleMap>
    </div>
  );
}

function MapMarker({ marker, handleClick }) {
  return (
    <Marker
      key={marker.slug}
      position={{
        lat: marker.lat,
        lng: marker.lng,
      }}
      icon={{
        url: '/map-marker.svg',
        scaledSize: new window.google.maps.Size(30, 30),
        origin: new window.google.maps.Point(0, 0),
      }}
      onClick={handleClick}
    />
  );
}

function MapInfoWindow({ selected, handleCloseClick, infoBody }) {
  return (
    <InfoWindow
      position={{ lat: selected.lat, lng: selected.lng }}
      options={{ pixelOffset: new google.maps.Size(0, -30) }}
      onCloseClick={handleCloseClick}
    >
      {infoBody}
    </InfoWindow>
  );
}

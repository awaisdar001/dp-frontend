import '../static/styles/css/Trips.css';

import React from 'react';
import { useParams } from 'react-router-dom';

import TripItem from '../trips/trip-item';

export default function TripsPage() {
  let { slug } = useParams();
  return <TripItem slug={slug} />;
}

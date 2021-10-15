import '../static/styles/scss/Trips.scss';

import React from 'react';
import { useParams } from 'react-router-dom';

import TripItem from '../trips/trip-item';

export default function TripsPage() {
  let { slug } = useParams();
  return <TripItem slug={slug} />;
}

import React from 'react';
import TripItem from '../trips/trip-item';
import '../static/styles/css/Trips.css';
import { useParams } from 'react-router-dom';

export default function TripsPage() {
  let { slug } = useParams();
  return <TripItem slug={slug} />;
}

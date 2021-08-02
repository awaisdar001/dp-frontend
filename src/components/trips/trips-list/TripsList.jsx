import React from 'react';
import { Container } from 'react-bootstrap';
import Content from './content';
import Cover from './cover/';
import TripsListHeader from './TripsListHeader';

export default function Trips() {
  const items = [
    { id: 1, label: 'Date', slug: 'date', icon: 'calendar' },
    {
      id: 2,
      label: 'Price Low to High',
      slug: 'price-low-to-high',
      icon: 'arrow-circle-up',
    },
    {
      id: 3,
      label: 'Price High to Low',
      slug: 'price-high-to-low',
      icon: 'arrow-circle-down',
    },
    { id: 4, label: 'Name (A - Z)', icon: 'pencil-alt' },
  ];
  return (
    <>
      <Cover />
      <Container fluid>
        <div className="dp-trips">
          <div className="search-page">
            <TripsListHeader items={items} activeItem={1} />
            <Content />
          </div>
        </div>
      </Container>
    </>
  );
}

import React from 'react';

import TimelineCard from './timeline-card';

const TimelineCards = ({ items }) => {
  return items.map((item) => {
    const { instance, displayUser } = item;

    return (
      <TimelineCard
        cardProps={{ user: displayUser, state: item.state }}
        instance={instance}
        key={`timeline-card-${item.id}`}
      />
    );
  });
};

export default TimelineCards;

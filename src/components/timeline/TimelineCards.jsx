import React from 'react';
import TimelineCard from './timeline-card';

const TimelineCards = ({ items }) => {
  return items.map((item) => {
    const {instance, displayUser} = item;

    const feedCardData = {
      type: item.type,
      name: item.state.name,
      username: displayUser.username,
      fullName: displayUser.fullName,
      profileURL: displayUser.profileUrl,
      nodeURL: instance.absUrl,
    };

    return (
      <TimelineCard
        card={feedCardData}
        instance={instance}
        key={`timeline-card-${item.id}`}
      />
    );
  });
};

export default TimelineCards;

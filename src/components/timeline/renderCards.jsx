import React from "react";
import TimelineCard from "./TimelineCard/index";

const RenderCards = ({ items }) => {
  return items.map((item) => {
    const { instance } = item;
    const displayUser = item.display_user;

    const feedCardData = {
      type: item.type,
      name: item.state.name,
      username: displayUser.username,
      fullName: displayUser.full_name,
      profileURL: displayUser.profile_url,
      nodeURL: instance.abs_url,
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

export default RenderCards;

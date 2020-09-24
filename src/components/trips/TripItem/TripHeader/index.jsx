import React from "react";
import TripsHeader from "./TripHeader";
const headerItems = [
  { slug: "facilities", label: "Facilities", icon: "arrow-circle-up" },
  { slug: "tour-plan", label: "Tour Plan", icon: "calendar" },
  { slug: "location", label: "Location", icon: "arrow-circle-down" },
  { slug: "reviews", label: "Reviews", icon: "pencil-alt" },
  { slug: "gallery", label: "Gallery", icon: "pencil-alt" },
];
function TripHeader() {
  const [activeLink, setActiveLink] = React.useState(headerItems[0].slug);
  const handleOnClick = (slug, e) => {
    setActiveLink(slug);
  };

  return (
    <TripsHeader
      items={headerItems}
      handleOnClick={handleOnClick}
      activeItem={activeLink}
    />
  );
}

export default TripHeader;

import React from "react";
import { useDispatch } from "react-redux";
import { updateTripsBySlider } from "../../../../store/features/trips";
import withSidebar from "../../../common/hoc/withSidebar";
import DateSlider from "./DateSlider";
import DaysSlider from "./DaysSlider";
import Destinations from "./Destinations";
import PriceSlider from "./PriceSlider";

const Sidebar = () => {
  const dispatch = useDispatch();
  const commitChange = (type, number) => {
    dispatch(updateTripsBySlider({ type, number }));
  };

  return (
    <>
      <DaysSlider commitChange={commitChange} />
      <DateSlider commitChange={commitChange} />
      <PriceSlider commitChange={commitChange} />
      <Destinations />
    </>
  );
};

export default withSidebar(Sidebar, "Filter your Trip");

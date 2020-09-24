import Typography from "@material-ui/core/Typography";
import React from "react";
import { useSelector } from "react-redux";
import { selectSearchDays } from "../../../../store/features/trips";
import DPSlider from "../../../common/sliders/DPSlider";

const id = "id-days-slider";
function DaysSlider({ commitChange }) {
  const handleValueLabelFormat = (number) => `${number} Days`;
  const daysInState = useSelector(selectSearchDays);
  const [days, setDays] = React.useState(daysInState);
  const handleChange = (e, value) => setDays(value);

  return (
    <>
      <Typography id={id} gutterBottom>
        {"Duration " + handleValueLabelFormat(days)}
      </Typography>
      <DPSlider
        name="days"
        aria-labelledby={id}
        min={1}
        max={20}
        value={days}
        getAriaValueText={handleValueLabelFormat}
        valueLabelFormat={handleValueLabelFormat}
        onChange={handleChange}
        onChangeCommitted={(e, value) => commitChange("days", value)}
      />
    </>
  );
}

export default React.memo(DaysSlider);

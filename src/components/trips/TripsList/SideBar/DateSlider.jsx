import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import React from "react";
import { getDateFromMilliSec } from "../../../../Utils";
import DPSlider from "../../../common/sliders/DPSlider";

const id = "id-date-sliders";
const step = 86400000;
const minDate = moment().startOf("day").valueOf();
const maxDate = moment(minDate).add(1, "M").valueOf();

const DateSlider = ({ commitChange }) => {
  const [dates, setDates] = React.useState([minDate, maxDate]);
  const handleChange = (e, newDates) => setDates(newDates);
  const handleAriaValueText = (number, index) => getDateFromMilliSec(number);

  const getHeadding = () =>
    `Date ${getDateFromMilliSec(dates[0])} — ${getDateFromMilliSec(dates[1])}`;
  return (
    <div>
      <Typography id={id} gutterBottom>
        {getHeadding()}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs>
          <DPSlider
            name="date"
            aria-labelledby={id}
            min={minDate}
            max={maxDate}
            step={step}
            value={dates}
            onChange={handleChange}
            getAriaValueText={handleAriaValueText}
            valueLabelFormat={handleAriaValueText}
            onChangeCommitted={(e, number) => commitChange("dates", number)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(DateSlider);

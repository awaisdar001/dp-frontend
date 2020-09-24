import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Humanize from "humanize-plus";
import React from "react";
import { useSelector } from "react-redux";
import { selectSearchPrices } from "../../../../store/features/trips";
import DPSlider from "../../../common/sliders/DPSlider";

const id = "id-price-slider";
const step = 1000;
const min = 1000;
const max = 50000;
const PriceSlider = ({ commitChange }) => {
  const pricesInState = useSelector(selectSearchPrices);
  const [prices, setPrices] = React.useState(pricesInState);

  const handleChange = (e, newPrices) => setPrices(newPrices);
  const handleLabelFormat = (number, index) =>
    `Rs. ${Humanize.compactInteger(number)}`;
  const getHeadding = () =>
    `Price ${handleLabelFormat(prices[0])} — ${handleLabelFormat(prices[1])}`;

  return (
    <div>
      <Typography id={id} gutterBottom>
        {getHeadding()}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs>
          <DPSlider
            name="price-range"
            aria-labelledby={id}
            value={prices}
            min={min}
            max={max}
            step={step}
            getAriaValueText={handleLabelFormat}
            valueLabelFormat={handleLabelFormat}
            onChangeCommitted={(e, number) => commitChange("prices", number)}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(PriceSlider);

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Humanize from 'humanize-plus';
import React, {useState} from 'react';
import {DpSlider} from '../../../common';

const id = 'id-price-slider';
const step = 1000;

const PriceSlider = ({minPrice, maxPrice, onChange}) => {
  const [prices, setPrices] = useState([minPrice, maxPrice]);
  const formatValue = (number, index) => `Rs. ${Humanize.compactInteger(number)}`;

  const Heading = () => (
    <Typography id={id} gutterBottom>
      {`Price ${formatValue(prices[0])} — ${formatValue(prices[1])}`}
    </Typography>
  );

  return (
    <div>
      <Heading/>
      <Grid container spacing={2}>
        <Grid item xs>
          <DpSlider
            name="price-range"
            aria-labelledby={id}
            value={prices}
            min={minPrice}
            max={maxPrice}
            step={step}
            getAriaValueText={formatValue}
            valueLabelFormat={formatValue}
            onChangeCommitted={(e, newPrices) => onChange({type: 'prices', number: newPrices})}
            onChange={(e, newPrice) => setPrices(newPrice)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(PriceSlider);

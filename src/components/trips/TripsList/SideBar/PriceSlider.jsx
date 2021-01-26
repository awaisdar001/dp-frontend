import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Humanize from 'humanize-plus';
import { useState, memo } from 'react';
import { useStore } from 'react-redux';
import {
  selectSearchPrices,
  selectSearchState,
} from '../../../../store/features/trips';
import DPSlider from '../../../common/sliders/DPSlider';

const id = 'id-price-slider';
const step = 1000;

const PriceSlider = ({ commitChange }) => {
  const store = useStore();
  const [minPrice, maxPrice] = selectSearchState(
    store.getState()
  ).initial.prices;
  // const [minUserPrice, maxUserPrice] = selectSearchPrices(store.getState());
  const [prices, setPrices] = useState([minPrice, maxPrice]);

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
            min={minPrice}
            max={maxPrice}
            step={step}
            getAriaValueText={handleLabelFormat}
            valueLabelFormat={handleLabelFormat}
            onChangeCommitted={(e, newPrice) =>
              commitChange('prices', newPrice)
            }
            onChange={(e, newPrice) => setPrices(newPrice)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(PriceSlider);

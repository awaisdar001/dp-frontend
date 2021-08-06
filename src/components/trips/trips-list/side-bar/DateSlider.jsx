import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { useStore } from 'react-redux';
import { getDateFromMilliSec } from '../../../../utils';
import DPSlider from '../../../common/sliders/DPSlider';
import {
  selectSearchDates,
  selectSearchState,
} from '../../../../store_old/features/trips';

const id = 'id-date-sliders';
const step = 86400000;

const DateSlider = ({ commitChange }) => {
  const store = useStore();
  const [minDate, maxDate] = selectSearchState(store.getState()).initial.dates;
  const [dates, setDates] = React.useState([minDate, maxDate]);

  const handleAriaValueText = (number, index) => getDateFromMilliSec(number);
  const getHeadding = () =>
    `Date ${getDateFromMilliSec(dates[0])} — ${getDateFromMilliSec(dates[1])}`;

  const commitChangesToStore = (unSavedDates) =>
    commitChange('dates', unSavedDates);

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
            onChange={(e, newDates) => setDates(newDates)}
            getAriaValueText={handleAriaValueText}
            valueLabelFormat={handleAriaValueText}
            onChangeCommitted={(e, newDates) => commitChangesToStore(newDates)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(DateSlider);

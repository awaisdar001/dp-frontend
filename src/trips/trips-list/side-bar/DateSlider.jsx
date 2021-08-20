import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {getDateFromMilliSec} from '../../../utils';
import {DpSlider} from '../../../common';

const id = 'id-date-sliders';
const step = 86400000;

const DateSlider = ({minDate, maxDate, onChange}) => {
  const [dates, setDates] = React.useState([minDate, maxDate]);

  const formatValue = (number, index) => getDateFromMilliSec(number);

  const Heading = () => (
    <Typography id={id} gutterBottom>
      {`Date ${getDateFromMilliSec(dates[0])} — ${getDateFromMilliSec(dates[1])}`}
    </Typography>
  );

  return (
    <div>
      <Heading/>
      <Grid container spacing={2}>
        <Grid item xs>
          <DpSlider
            name="date"
            aria-labelledby={id}
            min={minDate}
            max={maxDate}
            value={dates}
            step={step}
            getAriaValueText={formatValue}
            valueLabelFormat={formatValue}
            onChange={(e, newDates) => setDates([...newDates])}
            onChangeCommitted={(e, newDates) => onChange({type: 'dates', number: newDates})}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(DateSlider);
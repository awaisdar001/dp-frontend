import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useStore } from 'react-redux';
import {
  selectSearchDays,
  selectSearchState,
} from '../../../../store/features/trips';
import DPSlider from '../../../common/sliders/DPSlider';

const id = 'id-days-slider';

function DaysSlider({ commitChange }) {
  const store = useStore();
  const [minDay, maxDay] = selectSearchState(store.getState()).initial.days;
  const [days, setDays] = React.useState([minDay, maxDay]);

  const handleValueLabelFormat = (days) => `${days[0]} Days — ${days[1]} Days`;
  const commitChangesToStore = (days) => commitChange('days', days);

  return (
    <>
      <Typography id={id} gutterBottom>
        {'Duration ' + handleValueLabelFormat(days)}
      </Typography>
      <DPSlider
        name="days"
        aria-labelledby={id}
        min={minDay}
        max={maxDay}
        value={days}
        getAriaValueText={handleValueLabelFormat}
        valueLabelFormat={handleValueLabelFormat}
        onChange={(e, newDays) => setDays(newDays)}
        onChangeCommitted={(e, newDays) => commitChangesToStore(newDays)}
      />
    </>
  );
}

export default React.memo(DaysSlider);

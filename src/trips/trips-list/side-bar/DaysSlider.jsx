import Typography from '@material-ui/core/Typography';
import React from 'react';
import DPSlider from '../../../components/common/sliders/DPSlider';

const id = 'id-days-slider';

function DaysSlider({minDay, maxDay, onChange}) {
  const [days, setDays] = React.useState([minDay, maxDay]);

  const formatValue = (days) => `${days[0]} Days — ${days[1]} Days`;

  const Heading = () => (
    <Typography id={id} gutterBottom>
      {'Duration ' + formatValue(days)}
    </Typography>)

  return (
    <>
      <Heading/>
      <DPSlider
        name="days"
        aria-labelledby={id}
        min={minDay}
        max={maxDay}
        value={days}
        getAriaValueText={formatValue}
        valueLabelFormat={formatValue}
        onChange={(e, newDays) => setDays([...newDays])}
        onChangeCommitted={(e, newDays) => onChange({type: 'days', number: newDays})}
      />
    </>
  );
}

export default React.memo(DaysSlider);

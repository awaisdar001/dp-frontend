import DateFnsUtils from '@date-io/moment'; // choose your lib
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createMuiTheme, MuiThemeProvider, TextField } from '@material-ui/core';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useState } from 'react';

const customTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#7ed12d',
      },
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: lightGreen['400'],
        '&:hover': {
          backgroundColor: lightGreen['400'],
        },
      },
      current: {
        backgroundColor: lightGreen['100'],
        color: 'black',
      },
    },

    MuiPickersModal: {
      dialogAction: {
        color: lightGreen['400'],
      },
    },
    MuiButton: {
      textPrimary: {
        color: 'black',
      },
    },
  },
});

const renderInput = (props) => {
  return (
    <div className="input-with-icon">
      <TextField
        fullWidth
        name={props.name}
        value={props.value}
        label={props.lable}
        onClick={props.onClick}
        onKeyDown={props.onKeyDown}
        placeholder={props.placeholder}
        InputProps={{
          disableUnderline: true,
        }}
      />
      <span className="input-icon">
        <FontAwesomeIcon icon={faCalendar} className="margin-right-3" />
      </span>
    </div>
  );
};
const TripDatePicker = (props) => {
  const tripDates = props.dates;
  const [selectedDate, handleDateChange] = useState(null);

  return (
    <MuiThemeProvider theme={customTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          variant="dialog"
          name={props.name}
          inputVariant="outlined"
          label="Basic example"
          format="Do MMMM YYYY"
          value={selectedDate ? selectedDate : null}
          shouldDisableDate={(day) => !tripDates.includes(day.date())}
          placeholder="Select Trip date"
          onChange={handleDateChange}
          fullWidth
          animateYearScrolling
          TextFieldComponent={renderInput}
        />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
};

export default TripDatePicker;

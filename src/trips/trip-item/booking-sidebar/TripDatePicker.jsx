import DateFnsUtils from '@date-io/moment'; // choose your lib
import {faCalendar} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {MuiThemeProvider, TextField} from '@material-ui/core';
import lightGreen from '@material-ui/core/colors/lightGreen';
import {createTheme} from '@material-ui/core/styles';
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import moment from 'moment';
import React, {useContext, useState} from 'react';

import {DateUtils} from "../../../utils";

const customTheme = createTheme({
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
        color: lightGreen['400'],
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
        label={props.label}
        onClick={props.onClick}
        onKeyDown={props.onKeyDown}
        placeholder={props.placeholder}
        InputProps={{
          disableUnderline: true,
        }}
      />
      <span className="input-icon">
        <FontAwesomeIcon icon={faCalendar} className="margin-right-3"/>
      </span>
    </div>
  );
};

const TripDatePicker = ({name, tripDates}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (date) => {
    setSelectedDate(DateUtils.formatToYearMonthDay(date));
  }
  const handleShouldDisplayDate = (day) => {
    const includes = tripDates.includes(DateUtils.formatToYearMonthDay(day));
    return !includes;
  };

  return (
    <MuiThemeProvider theme={customTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          variant="dialog"
          name={name}
          inputVariant="outlined"
          // label="Basic example"
          format="Do MMMM YYYY"
          disablePast={true}
          value={selectedDate}
          shouldDisableDate={handleShouldDisplayDate}
          placeholder="Select Trip date"
          onChange={handleChange}
          fullWidth
          maxDate={moment('2022-01-01')}
          animateYearScrolling
          TextFieldComponent={renderInput}
        />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
};

export default TripDatePicker;

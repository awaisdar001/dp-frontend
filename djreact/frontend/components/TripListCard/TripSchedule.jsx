import React from 'react';
import { format } from 'date-fns';

const TripScheudle = props => {
  const { schedules } = props;
  return (
    <div>
      {schedules.map((schedule, index) => {
        let dateFrom = new Date(schedule.date_from);
        <a key={schedule.id} className='tooltips' href='#' title={dateFrom}>
          {(index >= 1 ? ', ' : '') + format(dateFrom, 'Do MMM')}
        </a>;
      })}
    </div>
  );
};

export default TripScheudle;

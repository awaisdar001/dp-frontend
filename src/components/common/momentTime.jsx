import React from 'react';
import moment from 'moment';
import 'moment-timezone';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

export const ReactFEFormat = 'MMM DD, YYYY';
const FEFormats = {
  s: 'MMM DD, YYYY',
};

export const MomentTime = ({ dateTime }) => {
  const format = FEFormats.s;
  const diff = moment().diff(moment(dateTime));
  const duration = moment
    .duration(diff, 'milliseconds')
    .format('y [years], M [months ago]');

  return (
    <time dateTime={moment(dateTime).format(format)} title={duration}>
      {moment(dateTime).format(format)}
    </time>
  );
};

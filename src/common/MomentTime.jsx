import 'moment-timezone';

import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import React from 'react';
export const ReactFEFormat = 'MMM DD, YYYY';

momentDurationFormatSetup(moment);
const FEFormats = {
  s: 'MMM DD, YYYY',
};
export const MomentTime = (props) => {
  const { propDateTime } = props;
  const format = FEFormats.s;
  const diff = moment().diff(moment(propDateTime));
  const duration = moment
    .duration(diff, 'milliseconds')
    .format('y [years], M [months ago]');
  return (
    <time dateTime={moment(propDateTime).format(format)} title={duration}>
      {moment(propDateTime).format(format)}
    </time>
  );
};

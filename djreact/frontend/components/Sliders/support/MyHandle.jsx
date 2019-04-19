import React from 'react';
import { format } from 'date-fns';
import { formatDigit } from '../../../utils';

export function Handle({ handle: { id, value, percent }, getHandleProps }) {
  return (
    <div
      style={{
        left: `${percent}%`
      }}
      className='slider-handle'
      {...getHandleProps(id)}
    >
      <div className='slider-handle-info'>{value}</div>
    </div>
  );
}

export function DateHandle({ handle: { id, value, percent }, getHandleProps }) {
  return (
    <div
      className='slider-handle'
      style={{
        left: `${percent}%`
      }}
      {...getHandleProps(id)}
    >
      <div className='slider-handle-info'>{format(value, 'Do MMM')}</div>
    </div>
  );
}

export function PriceHandle({
  handle: { id, value, percent },
  getHandleProps
}) {
  return (
    <div
      className='slider-handle'
      style={{
        left: `${percent}%`
      }}
      {...getHandleProps(id)}
    >
      <div className='slider-handle-info'>${formatDigit(value)}</div>
    </div>
  );
}

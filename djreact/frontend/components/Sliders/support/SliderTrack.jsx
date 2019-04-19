import React from 'react';

export function Track({ source, target, getTrackProps }) {
  return (
    <div
      className='slider-track'
      style={{
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`
      }}
      {...getTrackProps()}
    />
  );
}

import React, { Component } from 'react';
import { Handles, Rail, Slider, Tracks } from 'react-compound-slider';

import { DateHandle } from './support/MyHandle';
import { Track } from './support/SliderTrack';
import { sliderStyle } from './Common';

class DateSlider extends Component {
  render() {
    const { step, domain, onChange, initial_min, initial_max } = this.props;

    return (
      <div>
        <Slider
          mode={1}
          step={step}
          domain={domain}
          rootStyle={sliderStyle}
          values={[initial_min, initial_max]}
          onChange={onChange}
        >
          <Rail>
            {({ getRailProps }) => (
              <div className='slider-rail' {...getRailProps()} />
            )}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className='slider-handles'>
                {handles.map(handle => (
                  <DateHandle
                    key={handle.id}
                    handle={handle}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className='slider-tracks'>
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
        </Slider>
      </div>
    );
  }
}

export default DateSlider;

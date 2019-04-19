import React, { Component } from 'react';
import { Handles, Rail, Slider, Tracks } from 'react-compound-slider';

import { Handle } from './support/MyHandle';
import { Track } from './support/SliderTrack';
import { sliderStyle } from './Common';

class TwoWaySlider extends Component {
  render() {
    const { domain, initial_min, initial_max, step, onChange } = this.props;

    return (
      <div>
        <Slider
          rootStyle={sliderStyle}
          domain={domain}
          step={step}
          mode={2}
          values={[initial_min, initial_max]}
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
                  <Handle
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

export default TwoWaySlider;

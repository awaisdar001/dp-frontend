import React from 'react';

import SearchInput from './SearchInput';
import TripCrums from './TripCrum';

const Cover = () => {
  return (
    <div className="dp-trips" style={{ marginTop: '-50px' }}>
      <TripCrums />
      <SearchInput />
    </div>
  );
};

export default Cover;

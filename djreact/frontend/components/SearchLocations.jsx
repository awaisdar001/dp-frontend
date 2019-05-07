import React from 'react';

const SearchLocations = ({ searchLocationsList, onChangeCallBack }) => {
  return searchLocationsList.map((location, index) => {
    return (
      <li key={index} className='list-container'>
        <label className='checkbox'>
          <input
            type='checkbox'
            name='location'
            value={location.name}
            defaultChecked
            onChange={e => onChangeCallBack(e, location.name)}
          />
          {location.name}
        </label>
      </li>
    );
  });
};
export default SearchLocations;

import React from 'react';

const SearchActivities = ({ searchActivitiesList, onChangeCallBack }) => {
  return searchActivitiesList.map((activity, index) => {
    return (
      <li key={index}>
        <label className='checkbox'>
          <input
            type='checkbox'
            name='activity'
            value={activity.name}
            defaultChecked
            onChange={e => onChangeCallBack(e, activity.name)}
          />
          {activity.name}
        </label>
      </li>
    );
  });
};
export default SearchActivities;

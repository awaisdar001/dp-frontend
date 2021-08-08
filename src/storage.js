export const TimelineProKey = 'timeline-acc-pro';
export const TimelineFeedTypesKey = 'timeline-acc-feed-types';
export const TripsActiveSortingKey = 'trips-header-active-sorting';

const BASE_KEY = 'dp-storage';

export const hasStorage = () => Boolean(localStorage.getItem(BASE_KEY));

const getTimelineStorage = () => {
  const lStorage = localStorage.getItem(BASE_KEY) || '{}';
  return JSON.parse(lStorage);
};

const getTripsStorage = () => {
  if (!hasStorage()) {

  }
  const lStorage = localStorage.getItem(BASE_KEY) || '{}';
  return JSON.parse(lStorage);
};


const setTimelineStorage = (storageData) => {
  localStorage.setItem(BASE_KEY, JSON.stringify(storageData));
};

/**
 * Method to get data from the localstorage using the key.
 * @returns {object} => Item value in the storage
 * @param key => item key to get value for.
 * @param parse => Identifier either to load the json string or return as is.
 * @param defaultData => Value to return if value is not found in storage
 **/
const getItemFromStorage = (key, parse = false, defaultData = null) => {
  const storageData = getTimelineStorage();
  let localStorageData = storageData[key] || defaultData;
  if (localStorageData && parse) {
    localStorageData = JSON.parse(localStorageData);
  }
  return localStorageData;
};

const updateTimelineStorage = (key, value) => {
  let localStorageData = getTimelineStorage();
  localStorageData[key] = value;
  setTimelineStorage(localStorageData);
};

export const updateTimelineProsInStorage = (value) => {
  updateTimelineStorage(TimelineProKey, value);
};

export const getTimelineProsFromStorage = () => {
  return getItemFromStorage(TimelineProKey, false);
};

export const updateTimelineFeedTypesInStorage = (value) => updateTimelineStorage(TimelineFeedTypesKey, value);

export const getTimelineFeedsFromStorage = () => getItemFromStorage(TimelineFeedTypesKey, false);

export const getTripsActiveSortingFromStorage = (defaultValue) => getItemFromStorage(TripsActiveSortingKey, false, defaultValue);

export const updateTripsActiveSortingFromStorage = (value) => updateTimelineStorage(TripsActiveSortingKey, value);
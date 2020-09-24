export const TimelineProLocalStorageKey = "timeline-acc-pro";
export const TimelineFeedTypesLocalStorageKey = "timeline-acc-feed-types";

const LocalStorageKey = "dp-storage";

export const hasLocalStorage = () => {
  return Boolean(localStorage.getItem(LocalStorageKey));
};
const getTimelienStorage = () => {
  const lStorage = localStorage.getItem(LocalStorageKey) || "{}";
  return JSON.parse(lStorage);
};

const setTimelienStorage = (localStorageData) => {
  localStorage.setItem(LocalStorageKey, JSON.stringify(localStorageData));
};

/**
 * Method to get data from the localstorage using the key.
 *
 * @param   {string key} => item key to get value for.
 * @param   {Boolean parse} => Identifier either to load the json string or return as is.
 * @param   {object || null defaultData} => Value to return if value is not found in storage
 *
 * @returns {object} => Item value in the storage
 **/
const getItemFromLocalStorage = (key, parse = false, defaultData = null) => {
  try {
    const localStorage = getTimelienStorage();
    let localStorageData = localStorage[key] || defaultData;
    if (localStorageData && parse) {
      localStorageData = JSON.parse(localStorageData);
    }
    return localStorageData;
  } catch (e) {
    console.log('=>Error: getting object from storage', e);
    return defaultData
  }
};

const updateTimelineLocalStorage = (key, value) => {
  let localStorageData = getTimelienStorage();
  localStorageData[key] = value;
  setTimelienStorage(localStorageData);
};

export const updateTimelineProsInLocalStorage = (value) => {
  updateTimelineLocalStorage(TimelineProLocalStorageKey, value);
};

export const getTimelineProsFromLocalStorage = (defaultData) => {
  return getItemFromLocalStorage(TimelineProLocalStorageKey, false, defaultData);
};

export const updateTimelineFeedTypesInLocalStorage = (value) => {
  updateTimelineLocalStorage(TimelineFeedTypesLocalStorageKey, value);
};

export const getTimelineFeedsFromLocalStorage = (defaultData) => {
  return getItemFromLocalStorage(TimelineFeedTypesLocalStorageKey, false, defaultData);
};

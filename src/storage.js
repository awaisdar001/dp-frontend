class Storage {
  /**
   * Storage => {
   * BASE_KEY: {
   *  TIMELINE_PROS: {},
   *  TIMELINE_FEED_TYPES: {},
   *  TRIPS_ACTIVE_SORTING: {}
   *  },
   *}
   * @type {string}
   */
  BASE_KEY = 'dp-storage';
  TIMELINE_PROS = 'timeline-acc-pro';
  TIMELINE_FEED_TYPES = 'timeline-acc-feed-types';
  TRIPS_ACTIVE_SORTING = 'trips-header-active-sorting';


  hasStorage() {
    return localStorage.getItem(this.BASE_KEY);
  }

  getStorage() {
    const lStorage = localStorage.getItem(this.BASE_KEY) || '{}';
    return JSON.parse(lStorage);
  }

  updateStorage(storageData) {
    localStorage.setItem(this.BASE_KEY, JSON.stringify(storageData));
  };

  /**
   * Method to get data from the localstorage using the key.
   * @returns {object} => Item value in the storage
   * @param key => item key to get value for.
   * @param parse => Identifier either to load the json string or return as is.
   * @param defaultData => Value to return if value is not found in storage
   **/
  getItem(key, parse = false, defaultData = null) {
    const storageData = this.getStorage();
    let localStorageData = storageData[key] || defaultData;
    if (localStorageData && parse) {
      localStorageData = JSON.parse(localStorageData);
    }
    return localStorageData;
  };


  updateItem(key, value) {
    let localStorageData = this.getStorage();
    localStorageData[key] = value;
    this.updateStorage(localStorageData);
  };

  updateTimelinePros(value) {
    this.updateItem(this.TIMELINE_PROS, value)
  };

  getTimelinePros() {
    return this.getItem(this.TIMELINE_PROS);
  };

  updateTimelineFeedTypes(value) {
    this.updateItem(this.TIMELINE_FEED_TYPES, value);
  };

  getTimelineFeedTypes() {
    return this.getItem(this.TIMELINE_FEED_TYPES);
  };

  getTripsActiveSorting(defaultValue) {
    return this.getItem(this.TRIPS_ACTIVE_SORTING, defaultValue)
  };

  updateTripsActiveSorting(value) {
    this.updateItem(this.TRIPS_ACTIVE_SORTING, value);
  };
}

export default new Storage();
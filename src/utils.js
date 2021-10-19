import _ from 'lodash';
import camelCase from 'lodash.camelcase';
import snakeCase from 'lodash.snakecase';
import moment from 'moment';
import React from 'react';

import {hostRatingMappings} from './trips/data/enums';

export const DateFormats = {
  DayMonth: 'DD MMM', // 10 Oct
  YearMonthDate: 'YYYY-MM-DD', // 2020-10-10
};


export class DateUtils {
  static getDateFromTimestamp(number, format = true) {
    const date = moment(number);
    if (format) {
      return this.formatToYearMonthDay(date);
    }
    return date;
  }

  static formatToYearMonthDay(date) {
    return date.format('YYYY-MM-DD');
  }

  static formatToDayMonth(date) {
    return date.format('DD MMM');
  }
}

/** TripAvailability is used to get spcific set of dates for which a trip is available. */
export class TripAvailability {
  // @readonly TYPE
  // All the available trip availability options.
  static TYPE = {
    Daily: 'Daily',
    FixDate: 'FixDate',
    Weekly: 'Weekly',
  };

  // @readonly today
  // today's date object.
  today = moment().startOf('day');

  /**
   * constructor sets reuseable variables to the object.
   * @param  {String} type [Type of trip availability. This can be any option from the TYPE variable.]
   * @param  {Date} dateTo [The max date upto which a trip is available]
   * @param  {Object} options [The key-value object with additional options about the availability.]
   * @param  {Date} options.dateFrom [Date instance]
   * @param  {Date} options.dateTo [Indicates the validity up to date trip schedule.]
   * @param  {Number} options.dayOfWeek [Array of integers (1-7)]
   * @param  {[]} options.dates [Array date timestamps]
   * @param  {Object} rest [Any other information about the trip availability. ]
   * @param  {Number} rest.price [Number indicating the price of the trip]
   * @param  {Boolean} rest.is_per_person_price [Boolean indicating if the price is per person or group.]
   */
  constructor({type, dateTo, options, ...rest}) {
    this.type = type;
    this.dateTo = dateTo;
    this.options = options;
    this.rest = rest;
    this.beginDate = this.today.clone();
    this.scheduleDates = this.getDates();
  }

  /** getDates is called by constructor & can be called publicly.  */
  getDates = () => {
    if (this.type === TripAvailability.TYPE.Daily) {
      return this._getDailyScheduleDates();
    } else if (this.type === TripAvailability.TYPE.Weekly) {
      return this._getWeeklyScheduleDates();
    } else if (this.type === TripAvailability.TYPE.FixDate) {
      return this._getFixDateScheduleDates();
    } else {
      return [];
    }
  }

  /** formattedDates public method which can be used to get formatted dates.
   * @param  {String} dateFormat [string date format.]
   * */
  getFormattedDates(dateFormat = 'YYYY-MM-DD') {
    return this.scheduleDates.map((date) => date.format(dateFormat));
  }

  /**
   * _getDailyScheduleDates private method for calculating daily schedules.
   * @private
   **/
  _getDailyScheduleDates() {
    const beginDate = this.today.clone();
    const startDate = moment(this.options['dateFrom']);
    const endDate = moment(this.options['dateTo']);
    const scheduleDates = [];

    while (beginDate.isSameOrBefore(endDate, 'date')) {
      if (this._includeDate(beginDate) && this._isSameOrAfter(beginDate, startDate)) {
        scheduleDates.push(beginDate.clone());
      }
      beginDate.add(1, 'day');
    }
    return scheduleDates;
  }

  /**
   * _getWeeklyScheduleDates private method for calculating weekly schedules.
   * @private
   **/
  _getWeeklyScheduleDates() {
    const beginDate = this.today.clone();
    const daysOfWeek = this.options.dayOfWeek;
    const endDate = moment(this.dateTo);
    const scheduleDates = [];

    while (beginDate.isSameOrBefore(endDate, 'date')) {
      const dateWeekDateIsRequired = daysOfWeek.includes(beginDate.isoWeekday())
      if (this._includeDate(beginDate) && dateWeekDateIsRequired) {
        scheduleDates.push(beginDate.clone());
      }
      beginDate.add(1, 'day');
    }
    return scheduleDates;
  }

  /**
   * _getWeeklyScheduleDates private method for getting fixed date schedules.
   * @private
   **/
  _getFixDateScheduleDates() {
    const scheduleDates = this.options.dates
      .map((date) => moment(date))
      .filter(date => this._includeDate(date));
    return scheduleDates;
  }

  /**
   * _isSameOrAfter private method for calcuating if a given date is same
   * or after the given date.
   * @private
   * @param  {Date} inputDate [Date (moment) instance]
   * @param  {Date} compareDateWith [Date (moment) instance]
   **/
  _isSameOrAfter(inputDate, compareDateWith) {
    return inputDate.isSameOrAfter(compareDateWith, 'date');
  }

  /**
   * _includeDate returns boolean if date is today or in future
   * @private
   * @param  {Date} date [Date (moment) instance]
   * **/
  _includeDate(date) {
    return this._isSameOrAfter(date, this.today);
  }
}

/**
 * @param {Object} object
 * @param {function} modify
 * @returns {Object}
 */
export function modifyObjectKeys(object, modify) {
  // If the passed in object is not an Object, return it.
  if (
    object === undefined ||
    object === null ||
    (typeof object !== 'object' && !Array.isArray(object))
  ) {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map((value) => modifyObjectKeys(value, modify));
  }

  // Otherwise, process all its keys.
  const result = {};
  Object.entries(object).forEach(([key, value]) => {
    result[modify(key)] = modifyObjectKeys(value, modify);
  });
  return result;
}

/*
 * @param {Array|Object} object
 * @returns {Array|Object}
 */
export function camelCaseObject(object) {
  return modifyObjectKeys(object, camelCase);
}

/*
 * @param {Array|Object} object
 * @returns {Array|Object}
 */
export function snakeCaseObject(object) {
  return modifyObjectKeys(object, snakeCase);
}

export const getDateFromMilliSec = (number, format = DateFormats.DayMonth) =>
  moment(number).format(format);

/*
 * Convert all returns into HTML line break elements.
 * @param data{str} object
 */
export const toBr = (data) => {
  return data.replace(/(?:\r\n|\r|\n)/g, '<br />');
};

export const NewLineToBr = ({children = ''}) => {
  return children.split('\n').reduce((arr, line, index) => {
    const addP = <p key={index}>{line}</p>;
    if (line) {
      return arr.concat(addP);
    } else {
      return arr;
    }
  }, []);
};

export const transformQueryString = (queryArray) =>
  queryArray
    .map((keywords) => `${keywords[0]}=${keywords[1]}`)
    .reduce((queryItem, result) => `${queryItem}&${result}`);

export const buildQueryString = (dataArray, name, key = 'name') =>
  /*
    Given a list object, builds querystring

    dataArray ([]): list which contains dict objects. [{key: "value"}, {key: "value2"}]
    name (str): keyword name to be used while building querystring. name=value&name=value2
    key(str): key to be used for getting the data from dataArray. 

    */

  dataArray.map((item) => `${encodeURIComponent(name)}=${encodeURIComponent(item[key])}`).join('&');

export const getQueryStringParams = (query) => {
  /* 
    Get querystring object from the url.

    query (str): querystring part of the url. 
    Returns: dictionary object with key-value pairs.
  */

  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query).split('&').reduce((params, param) => {
      let [key, value] = param.split('=');
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
      return params;
    }, {})
    : {};
};

export const normalizeBySlug = (data) =>
  data && {
    ...data,
    id: data.slug,
  };

export const normalizeUser = (data, key) => ({
  ...data[key],
  id: data[key].username,
});

export const normalizeLocation = (location) => {
  let normalizedLocation = normalizeBySlug(location);
  const [lat, lng] = normalizedLocation.coordinates.split(',');
  normalizedLocation.lat = parseFloat(lat);
  normalizedLocation.lng = parseFloat(lng);
  return normalizedLocation;
};


export const createMarkup = (html) => ({__html: html});

export const getRatingFeedback = (rating) => {
  const wholeRating = Math.floor(rating);
  const ratingHit = hostRatingMappings[wholeRating];
  if (!_.isNil(ratingHit)) {
    return ratingHit;
  }
  const ratingNumber = _.max(
    Object.keys(hostRatingMappings)
      .map((key) => parseInt(key))
      .filter((key) => wholeRating > key),
  );
  return hostRatingMappings[ratingNumber];
};

/**
 * Removes duplicates from the data array.
 * Expects data contains objects with "id" keys.
 * @param data
 */
export const filterDuplicatesFromList = (data) => {
  const uniques = {}
  data.forEach(item => uniques[item.id] = item);
  return Object.keys(uniques).map(key => uniques[key]);
};
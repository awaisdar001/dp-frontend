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
  static getDateFromMilliSec(number, format = true) {
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

export const NewLineToBr = ({ children = '' }) => {
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
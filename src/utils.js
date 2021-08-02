import React from 'react';
import moment from 'moment';

export const DateFormats = {
  DayMonth: 'DD MMM', // 10 Oct
  YearMonthDate: 'YYYY-MM-DD', // 2020-10-10
};
export const getDateFromMilliSec = (number, format = DateFormats.DayMonth) =>
  moment(number).format(format);

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

export const renameKeys = (instance) => {
  return Object.keys(instance).reduce((acc, key) => {
    const cambleCaseKey = key
      .split('_')
      .map(function (name, i) {
        if (i > 0) {
          return name.charAt(0).toUpperCase() + name.substr(1);
        }
        return name;
      })
      .join('');
    return {
      ...acc,
      ...{ [cambleCaseKey]: instance[key] },
    };
  }, {});
};

export const buildQueryString = (dataArray, name, key = 'name') =>
  /*
    Given a list object, builds querystring

    dataArray ([]): list containg dict objects. [{key: "value"}, {key: "value2"}]
    name (str): keyword name to be used while building querystring. name=value&name=value2
    key(str): key to be used for getting the data from dataArray. 

    */

  dataArray.map((item) => `${name}=${item[key]}`).join('&');

export const getQueryStringFromParams = (params) =>
  new URLSearchParams(params).toString();

export const getQueryStringParams = (query) => {
  /* 
    Get querystring object from the url.

    query (str): querystring part of the url. 
    Returns: dictionary object with key-value pairs.
  */

  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split('&')
        .reduce((params, param) => {
          let [key, value] = param.split('=');
          params[key] = value
            ? decodeURIComponent(value.replace(/\+/g, ' '))
            : '';
          return params;
        }, {})
    : {};
};

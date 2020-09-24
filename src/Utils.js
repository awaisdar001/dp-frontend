import React from "react";
import moment from "moment";

export const getDateFromMilliSec = (number) => moment(number).format("DD MMM");

export const newLinesWithReact = (text) => {
  return text.replace(/(?:\r\n|\r|\n)/g, "<br />");
};

export const NewLineToBr = ({ children = "" }) => {
  return children.split("\n").reduce((arr, line, index) => {
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
      .split("_")
      .map(function (name, i) {
        if (i > 0) {
          return name.charAt(0).toUpperCase() + name.substr(1);
        }
        return name;
      })
      .join("");
    return {
      ...acc,
      ...{ [cambleCaseKey]: instance[key] },
    };
  }, {});
};

export const getQueryString = (dataArray, name, key = "name") => {
  return dataArray.map((item) => `${name}=${item[key]}`).join("&");
};

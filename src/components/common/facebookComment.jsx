import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "moment-timezone";
import React from "react";
import { default as NumberFormat } from "react-number-format";

export default ({ absUrl }) => {
  return (
    <a href={absUrl}>
      <FontAwesomeIcon icon="comments" className="margin-right-3" />
      <span>
        <NumberFormat value={0} displayType={"text"} thousandSeparator={true} />{" "}
        Comments
      </span>
    </a>
  );
};

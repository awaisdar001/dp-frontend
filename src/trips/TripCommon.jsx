import Rating from '@material-ui/lab/Rating';
import React, {useState} from 'react';
import {Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Humanize from "humanize-plus";

export function Title({className, name, url}) {
  return (
    <div className={'item-heading ' + className}>
      <h2 className="h2 trip-title">
        <Link to={url}>{name}</Link>
      </h2>
    </div>
  );
}

export const TitlePrice = ({className, price}) => {
  const formattedPrice = `Rs. ${Humanize.intComma(price)}`;

  return (
    <div className={'item-price ' + className}>
      <div className="item-price-container">
        <span className="item-price">{formattedPrice}</span>
        <span className="item-price-desc">/ per person</span>
      </div>
    </div>
  );
};

export const RatingPlugin = ({name, title, rating}) => {
  const [value, setValue] = useState(rating);
  const id = `id-${name}`;

  return (
    <Col lg={4} className="comment-rating">
      <label className="rating-label" htmlFor={id}>
        {title}
      </label>
      <span>
        <Rating
          className="rating-wrapper"
          id={id}
          value={value}
          precision={0.5}
          name={name}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </span>
    </Col>
  );
};

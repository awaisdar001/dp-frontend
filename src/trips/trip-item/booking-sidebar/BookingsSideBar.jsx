import {faEdit, faEnvelope, faIdCard,} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import NumberFormat from 'react-number-format';

import {withSidebar} from '../../../common';
import TripDatePicker from './TripDatePicker';

const BookingSideBar = ({tripDates}) => {
  const readOnly = Boolean(tripDates);

  return (
    <div>
      <TripDatePicker name="trip-date" tripDates={tripDates} readOnly/>

      <div className="input-with-icon">
        <input type="text" placeholder="Name*" name="name" readOnly />
        <span className="input-icon">
          <FontAwesomeIcon icon={faEdit} className="margin-right-3" />
        </span>
      </div>

      <div className="input-with-icon">
        <NumberFormat
          format="+92 (###) #######"
          allowEmptyFormatting
          mask="_"
          name="phone"
          readOnly
        />
        <span className="input-icon">
          <FontAwesomeIcon icon="phone" className="margin-right-3" />
        </span>
      </div>

      <div className="input-with-icon">
        <NumberFormat
          name="id-card"
          format="#####-#######-#"
          placeholder="CNIC*"
          mask="_"
          readOnly
        />
        <span className="input-icon">
          <FontAwesomeIcon icon={faIdCard} className="margin-right-3" />
        </span>
      </div>

      <div className="input-with-icon">
        <input type="email" placeholder="Email*" name="email" readOnly />
        <span className="input-icon">
          <FontAwesomeIcon icon={faEnvelope} className="margin-right-3" />
        </span>
      </div>

      <div className="input-with-icon">
        <textarea name="message" placeholder="Message" rows="7" readOnly />
      </div>

      <button type="submit" className="btn btn-success btn-block btn-lg" disabled>
        Book My Trip
      </button>
    </div>
  );
}

export default withSidebar(BookingSideBar, 'Book You Trip');

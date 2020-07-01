import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

const CouponItem = ({
  coupon: { id, merchant, discount, expiration_date: expirationDate, used }
}) => {
  return (
    <Fragment>
      <div>
        <h6>{merchant}</h6>
        <p>{discount}</p>
        <p>{moment(expirationDate).format('MM/DD/YYYY')}</p>
        <Link className='btn btn-themeBlue' to={`/edit-coupon/${id}`}>
          Edit
        </Link>
      </div>
    </Fragment>
  );
};

CouponItem.propTypes = {
  coupon: PropTypes.object.isRequired
};

export default CouponItem;

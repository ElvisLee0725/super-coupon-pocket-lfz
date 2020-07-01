import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CouponItem = ({
  coupon: { id, merchant, discount, expiration_date: expirationDate, used }
}) => {
  return (
    <Fragment>
      <div>
        <h4>{merchant}</h4>
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

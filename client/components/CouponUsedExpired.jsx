import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CouponUsedExpiredItem from './CouponUsedExpiredItem';

const CouponUsedExpired = ({ coupons }) => {
  return (
    <Fragment>
      {coupons.map(coupon => (
        <CouponUsedExpiredItem key={coupon.id} coupon={coupon} />
      ))}
    </Fragment>
  );
};

CouponUsedExpired.propTypes = {
  coupons: PropTypes.array.isRequired
};

export default CouponUsedExpired;

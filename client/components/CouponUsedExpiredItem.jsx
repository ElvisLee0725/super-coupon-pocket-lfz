import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import DeleteModal from './DeleteModal';
import { editCouponUsed, deleteCoupon } from '../actions/coupon';

const CouponUsedExpiredItem = ({
  coupon,
  editCouponUsed,
  deleteCoupon,
  history
}) => {
  const [markUnused, setUnused] = useState(coupon.used);

  return (
    <div className={`row ${coupon.used && 'coupon-used'}`}>
      <div className='col-1'>
        {moment(coupon.expiration_date) < moment() ? (
          <Fragment>
            <div
              type='button'
              className='mb-3'
              data-toggle='modal'
              data-target={`#deleteCouponModal${coupon.id}`}
            >
              <i className='fas fa-lg fa-trash-alt'></i>
            </div>
            <DeleteModal
              deleteCoupon={deleteCoupon}
              couponId={coupon.id.toString()}
              history={history}
            />
          </Fragment>
        ) : (
          <form>
            <div className='mb-3'>
              <input
                type='checkbox'
                className='coupon-layout__checkbox'
                name='markUnused'
                checked={markUnused}
                value={markUnused}
                onChange={() => {
                  setUnused(false);
                  editCouponUsed(coupon.id, false);
                }}
              />
            </div>
          </form>
        )}
      </div>
      <div className='col-3'>{coupon.merchant}</div>
      <div className='col-5'>{coupon.discount}</div>
      <div className='col-3'>
        {moment(coupon.expiration_date).format('MM/DD/YYYY')}
      </div>
    </div>
  );
};

CouponUsedExpiredItem.propTypes = {
  coupon: PropTypes.object.isRequired,
  editCouponUsed: PropTypes.func.isRequired,
  deleteCoupon: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(null, { editCouponUsed, deleteCoupon })(
  withRouter(CouponUsedExpiredItem)
);

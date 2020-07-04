import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCoupons, getCategories } from '../actions/coupon';
import PropTypes from 'prop-types';
import CouponItem from './CouponItem';

const Dashboard = ({ getAllCoupons, coupon: { coupons, loading } }) => {
  const [openingCouponId, setOpeningCouponId] = useState(undefined);

  useEffect(() => {
    getAllCoupons();
  }, []);

  return coupons.length > 0 ? (
    <Fragment>
      <div className='container'>
        <h1 className='text-center m-5'>Dashboard Page...</h1>
        {coupons.map(coupon => (
          <CouponItem
            key={coupon.id}
            coupon={coupon}
            openCouponTab={coupon.id === openingCouponId}
            setOpeningCouponId={setOpeningCouponId}
          />
        ))}
        <div className='text-center'>
          <div className='btn-addCoupon my-4'>
            <Link className='btn-addCoupon__icon-text' to='/add-coupon'>
              <i className='fas fa-2x fa-plus-circle'></i>
              Add coupon
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className='container text-center'>
        <h2>You have no coupon.</h2>
      </div>
      <div className='text-center'>
        <div className='btn-addCoupon my-4'>
          <Link className='btn-addCoupon__icon-text' to='/add-coupon'>
            <i className='fas fa-2x fa-plus-circle'></i>
            Add coupon
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getAllCoupons: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  coupon: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  coupon: state.coupon
});

export default connect(mapStateToProps, { getAllCoupons, getCategories })(
  Dashboard
);

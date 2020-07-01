import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCoupons, getCategories } from '../actions/coupon';
import PropTypes from 'prop-types';
import CouponItem from './CouponItem';

const Dashboard = ({ getAllCoupons, coupon: { coupons, loading } }) => {
  useEffect(() => {
    getAllCoupons();
  }, []);

  return coupons.length > 0 ? (
    <Fragment>
      <div className='container'>
        <h1>Dashboard Page...</h1>
        {coupons.map(coupon => (
          <CouponItem key={coupon.id} coupon={coupon} />
        ))}
        <div className='text-center'>
          <Link className='btn btn-themeBlue' to='/add-coupon'>
            Add coupon
          </Link>
        </div>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className='container text-center'>
        <h2>You have no coupon.</h2>
      </div>
      <div className='text-center'>
        <Link className='btn btn-themeBlue' to='/add-coupon'>
          Add coupon
        </Link>
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

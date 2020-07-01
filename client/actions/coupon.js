import {
  GET_COUPONS,
  GET_CURCOUPON,
  CLEAR_CURCOUPON,
  COUPON_ERROR,
  GET_CATEGORIES,
  DELETE_COUPON
} from './types';
import { setAlert } from './alert';
import axios from 'axios';

export const getAllCoupons = () => async dispatch => {
  dispatch({ type: CLEAR_CURCOUPON });

  try {
    const res = await axios.get('/api/coupons');
    dispatch({ type: GET_COUPONS, payload: res.data });
  } catch (err) {
    dispatch({
      type: COUPON_ERROR,
      payload: {
        msg: err.response.data.statusText,
        status: err.response.data.status
      }
    });
  }
};

export const getCategories = () => async dispatch => {
  try {
    const res = await axios.get('/api/coupons/categories');
    dispatch({ type: GET_CATEGORIES, payload: res.data });
  } catch (err) {
    dispatch({
      type: COUPON_ERROR,
      payload: {
        msg: err.response.data.statusText,
        status: err.response.data.status
      }
    });
  }
};

export const getCouponById = couponId => async dispatch => {
  try {
    const res = await axios.get(`/api/coupons/coupon/${couponId}`);
    dispatch({ type: GET_CURCOUPON, payload: res.data });
  } catch (err) {
    dispatch({
      type: COUPON_ERROR,
      payload: {
        msg: err.response.data.statusText,
        status: err.response.data.status
      }
    });
  }
};

export const editCoupon = (
  couponId,
  merchant,
  discount,
  categoryId,
  expirationDate,
  usedCoupon,
  history
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = {
      merchant,
      discount,
      categoryId,
      expirationDate,
      usedCoupon
    };
    // Update the coupon with its id
    await axios.put(`/api/coupons/${couponId}`, JSON.stringify(body), config);

    // Get all coupons after the selected coupon is updated
    getAllCoupons();
    dispatch(setAlert('Coupon Updated', 'success'));

    // Redirect to /dashboard when update success
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: COUPON_ERROR,
      payload: {
        msg: err.response.data.statusText,
        status: err.response.data.status
      }
    });
  }
};

export const addCoupon = (
  merchant,
  discount,
  categoryId,
  expirationDate,
  history
) => async dispatch => {
  try {
    // Post the new coupon
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    await axios.post(
      '/api/coupons',
      JSON.stringify({ merchant, discount, categoryId, expirationDate }),
      config
    );

    // Get all coupons after the new coupon is posted
    getAllCoupons();
    dispatch(setAlert('Coupon Created', 'success'));

    // Redirect to dashboard when coupon is created
    history.push('/dashboard');
  } catch (err) {
    const { error } = err.response.data;
    // error is the error message from server
    if (error) {
      dispatch(setAlert(error, 'danger'));
    }

    dispatch({
      type: COUPON_ERROR,
      payload: {
        msg: err.response.data.statusText,
        state: err.response.data.status
      }
    });
  }
};

export const deleteCoupon = (couponId, history) => async dispatch => {
  try {
    // Send delete request
    await axios.delete(`/api/coupons/${couponId}`);

    // Dispatch action to remove that coupon in redux state
    dispatch({ type: DELETE_COUPON, payload: couponId });
    dispatch(setAlert('Coupon Removed', 'success'));

    // Redirect to /dashboard
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: COUPON_ERROR,
      payload: {
        msg: err.response.data.statusText,
        state: err.response.data.status
      }
    });
  }
};

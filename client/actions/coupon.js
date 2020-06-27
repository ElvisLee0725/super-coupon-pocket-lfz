import {
  GET_COUPONS,
  CLEAR_COUPON,
  COUPON_ERROR,
  GET_CATEGORIES
} from './types';
import { setAlert } from './alert';
import axios from 'axios';

export const getAllCoupons = () => async dispatch => {
  // Clean coupon get from previous request:
  dispatch({ type: CLEAR_COUPON });

  try {
    const res = await axios.get('/api/coupons');
    dispatch({ type: GET_COUPONS, payload: res.data });
  } catch (err) {
    dispatch({
      type: COUPON_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
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
        msg: err.response.statusText,
        status: err.response.status
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
    const res = await axios.get('/api/coupons');
    dispatch({ type: GET_COUPONS, payload: res.data });
    dispatch(setAlert('Coupon created', 'success'));

    // Go back to dashboard when coupon is created
    history.push('/dashboard');
  } catch (err) {
    const { error } = err.response.data;
    // error is the error message from server
    if (error) {
      dispatch(setAlert(error, 'danger'));
    }

    dispatch({
      type: COUPON_ERROR,
      payload: { msg: err.response.statusText, state: err.response.status }
    });
  }
};

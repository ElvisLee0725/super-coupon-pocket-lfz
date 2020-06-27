import {
  GET_COUPONS,
  GET_CATEGORIES,
  COUPON_ERROR,
  CLEAR_COUPON
} from '../actions/types';

const initialState = {
  coupons: [],
  curCoupon: null,
  categories: [],
  loading: true,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_COUPONS:
      return {
        ...state,
        coupons: payload,
        loading: false
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loading: false
      };
    case CLEAR_COUPON:
      return {
        ...state,
        coupon: null,
        loading: false
      };
    case COUPON_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

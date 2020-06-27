import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import coupon from './coupon';

export default combineReducers({
  alert,
  auth,
  coupon
});

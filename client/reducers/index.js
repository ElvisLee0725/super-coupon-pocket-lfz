import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import coupon from './coupon';
import filter from './filter';

export default combineReducers({
  alert,
  auth,
  coupon,
  filter
});

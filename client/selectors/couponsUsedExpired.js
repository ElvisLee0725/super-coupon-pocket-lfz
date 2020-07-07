import moment from 'moment';

export default coupons => {
  return coupons
    .filter(coupon => {
      const isExpired =
        moment(coupon.expiration_date).diff(moment(), 'days') < 0;
      return coupon.used || isExpired;
    })
    .sort((coupon1, coupon2) => {
      return moment(coupon1.created_at) < moment(coupon2.created_at) ? 1 : -1;
    });
};

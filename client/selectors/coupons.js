import moment from 'moment';

export default (coupons, { text, category, sortBy }) => {
  return coupons
    .filter(coupon => {
      const textMatch = coupon.merchant
        .toLowerCase()
        .includes(text.toLowerCase());

      const categoryMatch =
        !!(category === null || category[coupon.category]);

      const isExpired =
        moment(coupon.expiration_date).diff(moment(), 'days') < 0;

      return textMatch && categoryMatch && !isExpired && !coupon.used;
    })
    .sort((coupon1, coupon2) => {
      if (sortBy === 'creation') {
        // Return the latest created coupon first
        return moment(coupon1.created_at) < moment(coupon2.created_at) ? 1 : -1;
      } else if (sortBy === 'expiration') {
        // Return the expiration date closest to today first
        return moment(coupon1.expiration_date).diff(moment(), 'days') <
          moment(coupon2.expiration_date).diff(moment(), 'days')
          ? -1
          : 1;
      }
    });
};

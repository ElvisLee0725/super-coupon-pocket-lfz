import 'react-dates/initialize';
import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import DeleteModal from './DeleteModal';
import {
  editCoupon,
  deleteCoupon,
  getCouponById,
  getCategories
} from '../actions/coupon';

const EditCoupon = ({
  editCoupon,
  deleteCoupon,
  coupon: { loading, curCoupon, categories },
  getCouponById,
  getCategories,
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    merchant: '',
    discount: ''
  });

  const [categoryId, setCategoryId] = useState('');

  const [expirationDate, setExpirationDate] = useState(moment());

  const [calendarFocused, setCalendarFocused] = useState(false);

  const [usedCoupon, setCouponUsed] = useState(false);

  useEffect(() => {
    getCouponById(match.params.couponId);
    getCategories();
  }, []);

  // Set the form only when curCoupon has values.
  // Make it has dependency of curCoupon so it runs after getCouponById() updates the currently viewing coupon
  useEffect(() => {
    if (curCoupon) {
      setFormData({
        merchant: curCoupon.merchant,
        discount: curCoupon.discount
      });

      setCategoryId(curCoupon.category_id.toString());
      setExpirationDate(
        !curCoupon.expiration_date
          ? moment()
          : moment(curCoupon.expiration_date)
      );
      setCouponUsed(curCoupon.used);
    }
  }, [curCoupon]);

  const { merchant, discount } = formData;

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    editCoupon(
      match.params.couponId,
      merchant,
      discount,
      categoryId,
      expirationDate,
      usedCoupon,
      history
    );
  };

  return (
    <Fragment>
      <div className='container'>
        <Link to='/dashboard' style={{ color: '#000' }}>
          <i className='fas fa-chevron-left'></i> &nbsp;Back
        </Link>
        <h2 className='text-center'>Edit</h2>
        {!curCoupon || loading ? <Fragment></Fragment> : <div></div>}

        <form onSubmit={e => handleSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Merchant, store, you name it!'
              name='merchant'
              value={merchant}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className='form-group'>
            <textarea
              className='form-control'
              rows='3'
              placeholder="What's the good deal?"
              name='discount'
              value={discount}
              onChange={e => handleChange(e)}
            ></textarea>
          </div>
          <h6>Category: </h6>
          <div className='form-group'>
            {categories.map(cat => (
              <div
                className='form-check form-check-inline'
                key={cat.category_id}
              >
                <label className='form-check-label'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='categoryId'
                    value={cat.category_id.toString()}
                    checked={categoryId === cat.category_id.toString()}
                    onChange={e => setCategoryId(cat.category_id.toString())}
                  />
                  {cat.category}
                </label>
              </div>
            ))}
          </div>
          <div>
            <span className='expirationDateTitle'>Expiration Date: &nbsp;</span>
            <SingleDatePicker
              date={expirationDate}
              onDateChange={date => setExpirationDate(date)}
              focused={calendarFocused}
              onFocusChange={({ focused }) => setCalendarFocused(focused)}
              id='thisismycalendar'
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
          <div className='form-group mb-3 mt-3'>
            <label>
              <input
                type='checkbox'
                className='mr-2'
                name='usedCoupon'
                checked={usedCoupon}
                value={usedCoupon}
                onChange={() => setCouponUsed(!usedCoupon)}
              />
              Used coupon
            </label>
          </div>

          <button
            type='submit'
            className='mt-1 btn btn-themeBlue btn-block-xs-only btn-style float-right'
          >
            Save
          </button>
          <button
            type='button'
            className='mt-1 btn btn-delete btn-block-xs-only btn-style float-right'
            data-toggle='modal'
            data-target={`#deleteCouponModal${match.params.couponId}`}
          >
            Delete
          </button>

          <DeleteModal
            deleteCoupon={deleteCoupon}
            couponId={match.params.couponId}
            history={history}
          />
        </form>
      </div>
    </Fragment>
  );
};

EditCoupon.propTypes = {
  editCoupon: PropTypes.func.isRequired,
  deleteCoupon: PropTypes.func.isRequired,
  getCouponById: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  coupon: state.coupon
});

export default connect(mapStateToProps, {
  editCoupon,
  deleteCoupon,
  getCouponById,
  getCategories
})(withRouter(EditCoupon));

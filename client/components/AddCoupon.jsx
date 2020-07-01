import 'react-dates/initialize';
import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { addCoupon, getCategories } from '../actions/coupon';

const AddCoupon = ({ addCoupon, getCategories, history, categories }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const [formData, setFormData] = useState({
    merchant: '',
    discount: ''
  });

  const { merchant, discount } = formData;

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [categoryId, setCategoryId] = useState(
    categories.length > 0 ? categories[0].category_id.toString() : ''
  );

  const [expirationDate, setExpirationDate] = useState(moment());

  const [calendarFocused, setCalendarFocused] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    addCoupon(merchant, discount, categoryId, expirationDate, history);
  };

  return (
    <Fragment>
      <div className='container'>
        <Link to='/dashboard' style={{ color: '#000' }}>
          <i className='fas fa-chevron-left'></i> &nbsp;Back
        </Link>
        <h2 className='text-center'>Add</h2>

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
          <div className='mb-5'>
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

          <button
            type='submit'
            className='mt-1 btn btn-themeBlue btn-block-xs-only btn-style float-right'
          >
            Save
          </button>
        </form>
      </div>
    </Fragment>
  );
};

AddCoupon.propTypes = {
  addCoupon: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  categories: state.coupon.categories
});

export default connect(mapStateToProps, { addCoupon, getCategories })(
  withRouter(AddCoupon)
);

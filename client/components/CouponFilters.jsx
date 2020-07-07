import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  setTextFilter,
  setCategoryFilter,
  sortByFilter,
  resetFilter
} from '../actions/filter';

const CouponFilters = ({
  categories,
  coupons,
  setTextFilter,
  setCategoryFilter,
  sortByFilter,
  resetFilter
}) => {
  useEffect(() => {
    // Reset the filter in redux and CouponFilters component when coupons array in redux changes so it renders all coupons in default view
    resetFilter();
    setSearchInput('');
    setCheckbox(
      categories.reduce(
        (cats, cat) => ({
          ...cats,
          [cat.category]: true
        }),
        {}
      )
    );
    setSortBy('creation');
  }, [coupons]);

  const [searchInput, setSearchInput] = useState('');

  // Convert categories array into inital object value: { restaurant: true, travel: true, ... }
  const [categoryCheckboxes, setCheckbox] = useState(
    categories.reduce(
      (cats, cat) => ({
        ...cats,
        [cat.category]: true
      }),
      {}
    )
  );

  const [sortBy, setSortBy] = useState('creation');

  return (
    <div className='mt-4 mb-3'>
      <form>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Search'
            name='searchInput'
            value={searchInput}
            onChange={e => {
              setTextFilter(e.target.value);
              setSearchInput(e.target.value);
            }}
          />
        </div>
        <div className='form-group'>
          {categories.map(cat => (
            <div key={cat.category_id} className='form-check form-check-inline'>
              <label className='form-check-label'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  name={cat.category}
                  checked={categoryCheckboxes[cat.category]}
                  onChange={e => {
                    const { name } = e.target;
                    setCategoryFilter({
                      ...categoryCheckboxes,
                      [name]: !categoryCheckboxes[name]
                    });
                    setCheckbox({
                      ...categoryCheckboxes,
                      [name]: !categoryCheckboxes[name]
                    });
                  }}
                />
                {cat.category}
              </label>
            </div>
          ))}
        </div>
        <div className='form-group form-inline'>
          <label className='ml-auto'>
            Sort By: &nbsp;
            <select
              className='form-control'
              value={sortBy}
              onChange={e => {
                sortByFilter(e.target.value);
                setSortBy(e.target.value);
              }}
            >
              <option value='creation'>Created Date</option>
              <option value='expiration'>Expiration Date</option>
            </select>
          </label>
        </div>
      </form>
    </div>
  );
};

CouponFilters.propTypes = {
  categories: PropTypes.array.isRequired,
  coupons: PropTypes.array.isRequired,
  setTextFilter: PropTypes.func.isRequired,
  setCategoryFilter: PropTypes.func.isRequired,
  sortByFilter: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  categories: state.coupon.categories,
  coupons: state.coupon.coupons
});

export default connect(mapStateToProps, {
  setTextFilter,
  setCategoryFilter,
  sortByFilter,
  resetFilter
})(CouponFilters);

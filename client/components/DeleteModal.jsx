import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const DeleteModal = ({ deleteCoupon, couponId, history }) => {
  return (
    <Fragment>
      <div
        className='modal fade'
        id={`deleteCouponModal${couponId}`}
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title text-center' id='exampleModalLabel'>
                Are you sure you want to delete this deal?
              </h5>
            </div>
            <div className='modal-body text-center'>
              You may add more deals whenever you want.
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-themeBlue btn-halfWidth'
                data-dismiss='modal'
              >
                Nope
              </button>

              <button
                type='button'
                className='btn btn-delete btn-halfWidth'
                data-dismiss='modal'
                onClick={() => deleteCoupon(couponId, history)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

DeleteModal.propTypes = {
  deleteCoupon: PropTypes.func.isRequired,
  couponId: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
};

export default DeleteModal;

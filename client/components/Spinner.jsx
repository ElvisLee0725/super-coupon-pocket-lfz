import React, { Fragment } from 'react';

const Spinner = () => {
  return (
    <Fragment>
      <img
        src='./images/loading-spinner.gif'
        className='m-auto d-block'
        style={{ width: '300px' }}
        alt='Loading...'
      />
    </Fragment>
  );
};

export default Spinner;

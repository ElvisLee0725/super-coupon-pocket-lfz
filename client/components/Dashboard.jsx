import React, { Fragment } from 'react';
import Navbar from './Navbar';

export const Dashboard = () => {
  return (
    <Fragment>
      <Navbar />
      <div className='container'>
        <h1>Dashboard Page...</h1>
      </div>
    </Fragment>
  );
};

export default Dashboard;

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

const Profile = ({ user, loading }) => {
  return loading || !user ? (
    <Spinner />
  ) : (
    <div className='box-layout'>
      <div className='box-layout__box'>
        <img
          src={user.avatar_url}
          className='mb-4 rounded-circle'
          alt='User Avatar'
        />
        <h3>{user.name}</h3>
        <h5>{user.email}</h5>
      </div>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(Profile);

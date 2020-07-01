import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import AddCoupon from './AddCoupon';
import EditCoupon from './EditCoupon';
import PrivateRoute from '../routers/PrivateRoute';
import setAuthToken from '../utils/setAuthToken';
import Navbar from './Navbar';
import Alert from './Alert';
import { loadUser } from '../actions/auth';

// Redux
import { Provider } from 'react-redux';
import store from '../store';

// Only set the auth token to header once when app is loaded
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));

    // Only load the user once the app is mounted
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <Alert />
            <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/register' component={Register} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/add-coupon' component={AddCoupon} />
              <PrivateRoute
                exact
                path='/edit-coupon/:couponId'
                component={EditCoupon}
              />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

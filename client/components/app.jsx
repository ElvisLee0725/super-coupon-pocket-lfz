import React, { Fragment } from 'react';

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
  }

  render() {
    return (
      <Fragment>
        <h1>Hello App</h1>
        <div className='btn btn-primary'>
          <i className='fas fa-trash'></i>Hey
        </div>
      </Fragment>
    );
  }
}

import React from 'react';
import { connect } from 'react-redux';
import { refreshProductList, refreshCategoryList, restoreCart } from './store';
import { Navbar } from './components';
import { ReviewForm } from './components'
import { Route, withRouter } from 'react-router-dom'

import Routes from './routes';

//import UserReviews from './components/reviews/user-reviews'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchInitialData();
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(refreshProductList())
    dispatch(refreshCategoryList())
    dispatch(restoreCart())
  }
});

export default withRouter(connect(null, mapDispatch)(App));

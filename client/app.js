import React from 'react';
import { connect } from 'react-redux';
import { refreshProductList } from './store';
import { Navbar } from './components';
import { Route, withRouter } from 'react-router-dom'

import Routes from './routes';
import ProductList from './components/product-list';
import DummyHome from './components/dummyhome'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchProductList();
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes />
        <Route exact path="/" component={DummyHome} />
        <Route exact path="/products" component={ProductList} />
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  fetchProductList: () => dispatch(refreshProductList())
});

export default withRouter(connect(null, mapDispatch)(App));

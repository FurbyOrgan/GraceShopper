import React from 'react';
import { connect } from 'react-redux';
import { refreshProductList } from './store';
import { Navbar } from './components';
import {ReviewForm} from './components'
import Routes from './routes';
import ProductList from './components/product-list';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchProductList();
  }

  render() {
    return (
      <div>
      <h1>Test</h1>
        <Navbar />
        <Routes />
        <ReviewForm/>
        
        <ProductList />
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  fetchProductList: () => dispatch(refreshProductList())
});

export default connect(null, mapDispatch)(App);

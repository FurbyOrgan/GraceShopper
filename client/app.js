import React from 'react';

import { Navbar } from './components';
import Routes from './routes';
import ProductList from './components/product-list';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <h1>Test</h1>
      <ProductList />
    </div>
  );
};

export default App;

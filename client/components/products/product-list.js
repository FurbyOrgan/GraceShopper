import React, { Component } from 'react';
import ProductListItem from './product-list-item';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Item } from 'semantic-ui-react'

const ProductList = ({ products }) => {
  return (
    <div>
      <h2>All Products</h2>
<<<<<<< HEAD:client/components/products/product-list.js
      <Item.Group divided>
        {products.map(productElement =>
          <ProductListItem key={productElement.id} product={productElement} />
        )}
      </Item.Group>
=======
      {products.map(productElement => <ProductListItem key={productElement.id} product={productElement} />)}
>>>>>>> master:client/components/product-list.js
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  if (ownProps.filteredProducts) {
    return { products: ownProps.filteredProducts };
  } else {
    return { products: state.products };
  }
};
export default connect(mapStateToProps, null)(ProductList);

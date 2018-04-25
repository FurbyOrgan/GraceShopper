import React, { Component } from 'react';
import ProductList from '../products/product-list';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Item, Header, Icon } from 'semantic-ui-react'

const CategoryProductList = ({ category, result }) => {
  return (
    <div textAlign='center'>
    <Header as='h2' icon textAlign='center'>
    <Icon name='tag' circular />
      Products in {category.name}
    </Header>
    
      <hr />
      <ProductList filteredProducts={result} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    result: state.products.filter(product => {
      const categories = product.categories;
      let includesCategory = false;
      categories.forEach(
        category => (category.id == ownProps.match.params.categoryId ? (includesCategory = true) : false)
      );
      return includesCategory;
    }),
    category: state.categories.filter(category => category.id == ownProps.match.params.categoryId)[0]
  };
};
export default connect(mapStateToProps, null)(CategoryProductList);

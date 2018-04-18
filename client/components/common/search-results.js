import React, { Component } from 'react';
import { ProductList } from '../';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

const SearchResults = props => {
  console.log(props.match);
  return (
    <div>
      <h2>Search Results</h2>
      {props.results.length === 0 ? (
        <strong>No results found.</strong>
      ) : (
        <ProductList filteredProducts={props.results} />
      )}
    </div>
  );
};

const mapStateToProps = ({ products }, ownProps) => ({
  results: products.filter(
    product => product.title.toLowerCase().indexOf(ownProps.match.params.searchQuery.toLowerCase()) !== -1
  )
});
export default withRouter(connect(mapStateToProps, null)(SearchResults));

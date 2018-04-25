import React, { Component } from 'react';
import { ProductList } from '../';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Container, Item, Header, Icon } from 'semantic-ui-react'

const SearchResults = props => {
  console.log(props.match);
  return (
    <div className="viewHeight">
    <Header as='h2' icon textAlign='center'>
    <Icon name='search' circular />
      Search Results
    </Header>
      
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

import React, { Component } from 'react';
import {ProductList} from '../';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchResults = (props) => {
  return (
    <div>
      <h2>Search Results</h2>
    </div>
  );
};

const mapStateToProps = ({ products }) => ({ products });
export default connect(mapStateToProps, null)(SearchResults);

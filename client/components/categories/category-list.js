import React, { Component } from 'react';
import CategoryListItem from './category-list-item';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const CategoryList = ({ categories }) => {
  return (
    <div>
      <h2>Categories</h2>
      {categories.map(categoryElement => <CategoryListItem key={categoryElement.id} category={categoryElement} />)}
    </div>
  );
};

const mapStateToProps = ({categories}) => ({categories})
export default connect(mapStateToProps, null)(CategoryList);

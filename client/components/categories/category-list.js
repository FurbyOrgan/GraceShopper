import React, { Component } from 'react';
import CategoryListItem from './category-list-item';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const CategoryList = ({ categories }) => {
  console.log('sgasg')
  return (
    <div>
      <h2>Categories</h2>
      {categories.map(categoryElement => <CategoryList key={categoryElement.id} product={categoryElement} />)}
    </div>
  );
};

const mapStateToProps = ({categories}) => ({categories})
export default connect(mapStateToProps, null)(CategoryList);

import React, { Component } from 'react';
import {Link} from 'react-router-dom'

const CategoryListItem = ({ category }) => {
  return (
    <div>
      <Link to={`/categories/${category.id}`}>
      	<h3>{category.name}</h3>
      </Link>
      <p>{category.description}</p>
    </div>
  );
};

export default CategoryListItem;

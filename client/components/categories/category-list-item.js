import React, { Component } from 'react';

const CategoryListItem = ({ category }) => {
  return (
    <div>
      <h3>{category.name}</h3>
      <p>{category.description}</p>
    </div>
  );
};

export default CategoryListItem;

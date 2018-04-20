import React, { Component } from 'react';
import CategoryListItem from './category-list-item';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Item } from 'semantic-ui-react'

const CategoryList = ({ categories }) => {
  return (
    <Container text>
      <h2>Categories</h2>
      <Item.Group divided>
        {categories.map(categoryElement => <CategoryListItem key={categoryElement.id} category={categoryElement} />)}
      </Item.Group>
    </Container>
  );
};

const mapStateToProps = ({ categories }) => ({ categories })
export default connect(mapStateToProps, null)(CategoryList);

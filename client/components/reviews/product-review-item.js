import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import {Item } from 'semantic-ui-react'


const ProductReviewItem = ({ review }) => {
    return (
      <Item>
      <h1>working</h1>
        <Item.Content>
          <Item.Header>{review.subject}</Item.Header>
          <Item.Meta>
            <span className='cinema'>{review.rating}</span>
          </Item.Meta>
          
          <Item.Description>{review.body}</Item.Description>
        </Item.Content>
      </Item>
    );
  };
  
  export default ProductReviewItem;
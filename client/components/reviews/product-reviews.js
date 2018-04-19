import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Item } from 'semantic-ui-react'


const ProductReviews = ({ reviews }) => {
    return (
      <div>
        <h2>All Product Reviews</h2>
        <Item.Group divided>
          
        </Item.Group>
      </div>
    );
  };


  const mapState = null;
  export default connect(mapState, null)(ProductReviews )
  
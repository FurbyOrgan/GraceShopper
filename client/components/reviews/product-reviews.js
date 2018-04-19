import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Item } from 'semantic-ui-react'
import {fetchProductReviews} from '../../store/review.js'
import ProductReviewItem from './product-review-item';

class ProductReviews extends Component {
  componentDidMount(){
    console.log(this.props, "them props")
    this.props.fetchProductReviews(Number(this.props.match.params.id))

  }

  render() {
    return (
      <div>
        <h2>All Product Reviews</h2>
        <Item.Group divided>
        {this.props.reviews.length? this.props.reviews.map(productReviews => 
          <div>
          <Item.Header>{productReviews.subject}</Item.Header>
            <span className='cinema'>{productReviews.rating}</span>
          <Item.Description>{productReviews.body} </Item.Description>
          </div>
          
          
          
        ): <h3>There are currently no reviews for this item</h3>}
          
        </Item.Group>
      </div>
    );
  }
  };


  const mapState = ({state, reviews}) =>( {state, reviews

  });

  const mapDispatch = {fetchProductReviews}

  
  export default connect(mapState, mapDispatch)(ProductReviews )
  
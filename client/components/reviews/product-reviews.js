import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Item,  Grid, Segment, Divider } from 'semantic-ui-react'
import {fetchProductReviews} from '../../store/review.js'
import ProductReviewItem from './product-review-item';
import {Link} from 'react-router-dom'
import ReviewForm from './review-form'
import { Button } from 'semantic-ui-react'

class ProductReviews extends Component {
  constructor (){
    super()
    this.state = {
      showForm: false,
    }
    this.renderReviewForm = this.renderReviewForm.bind(this)
  }
  componentDidMount(){
    console.log(this.props, "them props")
    this.props.fetchProductReviews(Number(this.props.match.params.id))

  }
  
  renderReviewForm (){
    this.setState({
      showForm: true
    })

  }


  render() {
    console.log(this.state)
    const reviewLength = this.props.reviews.length
    console.log(this.props.reviews)
    return (
      <div>
        <h3>Reviews for Product</h3>
        <Item.Group divided>
        {!this.state.showForm?<Button content='Leave Reviews' onClick={this.renderReviewForm}/>: <ReviewForm productId={Number(this.props.match.params.id)}/>}
        {reviewLength? this.props.reviews.map(productReviews => 
          <div>
          <Item.Header><h4>{productReviews.subject}</h4></Item.Header>
            <span className='cinema'>{productReviews.rating}</span>
          <Item.Description>{productReviews.body} </Item.Description>
          </div>
          
          
          
        ): (<div><h3>There are currently no reviews for this item.</h3>
           </div>)
      }
        
          
        </Item.Group>
      </div>
    );
  }
  };


  const mapState = ({reviews, products}, ownProps) =>

 {
    const paramId = Number(ownProps.match.params.id);
    const product = products.find(product => product.id === paramId);
    return { product, reviews };
  }

  const mapDispatch = {fetchProductReviews}

  
  export default connect(mapState, mapDispatch)(ProductReviews )
  
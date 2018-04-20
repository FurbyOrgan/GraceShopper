import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Item } from 'semantic-ui-react'
import {grabUsersReviews} from '../../store/review.js'

class UserReviews extends Component {
  componentDidMount(){
    console.log(this.props, "them props")
    this.props.grabUsersReviews(Number(this.props.match.params.id))

  }

  render() {
    return (
      <div>
        <h2>All User Reviews</h2>
        <Item.Group divided>
        {this.props.reviews.length? this.props.reviews.map(userReviews => 
          <div>
          <Item.Header>{userReviews.subject}</Item.Header>
            <span className='cinema'>{userReviews.rating}</span>
          <Item.Description>{userReviews.body} </Item.Description>
          </div>
          
          
          
        ): <h3>There are currently no reviews for this item</h3>}
          
        </Item.Group>
      </div>
    );
  }
  };


  const mapState = ({state, reviews}) =>( {state, review });

  const mapDispatch = {grabUsersReviews}

  
  export default connect(mapState, mapDispatch)(UserReviews )
  
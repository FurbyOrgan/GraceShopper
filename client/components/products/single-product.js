import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Step,
  Button,
  Container,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Segment,
  Divider, Rating
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CartAddButton from '../cart/cart-add-button';
import { fetchProductReviews } from '../../store';

class SingleProduct extends Component {
  componentWillMount() {
    this.props.doFetchReviews();

  }

  render() {
    const product = this.props.currentProduct;
    const reviews = this.props.productReviews;
    if (!product) return <div />;
    return (
      <div>
        <Container>
          <Item>
            <Item.Image src={product.imageUrl} />
            <Item.Content>
              <Item.Header as="h2">
                {product.title}
              </Item.Header>
              <Grid columns={2}>
                <Grid.Column>
                  <Item.Meta>
                    <Label tag>${product.price}</Label>
                  </Item.Meta>
                  <Item.Description>{product.description}</Item.Description>
                </Grid.Column>
                <Grid.Column>
                  <Item.Extra>
                    <CartAddButton product={product} />
                  </Item.Extra>
                </Grid.Column>
              </Grid>
            </Item.Content>
          </Item>
          <Divider horizontal />
          <Header>Reviews</Header>
          <Rating icon="star" defaultRating={product.averageRating} maxRating={5} size="large" disabled /> {`(${product.reviewCount})`}
          <p><Link to={`${product.id}/reviews`}>Leave a Review</Link></p>
          <Item.Group>
            {reviews.map(review => (
              <Item key={review.id}>
                <Item.Content>
                  <Item.Header>{review.subject}</Item.Header>
                  <br />
                  <Rating icon="star" defaultRating={review.rating} maxRating={5} disabled />
                  <Item.Description>{review.body}</Item.Description>
                </Item.Content>
              </Item>
            ))}
            <Divider horizontal />
          </Item.Group>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentProduct: state.products.filter(product => {
      return product.id === Number(ownProps.match.params.productId);
    })[0],
    productReviews: state.reviews.filter(review => {
      return review.productId === Number(ownProps.match.params.productId);
    })

  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    doFetchReviews: () => dispatch(fetchProductReviews(ownProps.match.params.productId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

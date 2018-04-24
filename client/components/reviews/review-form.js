import React from 'react';
import { connect } from 'react-redux';
import { Control, Form, actions } from 'react-redux-form';
import { Rating } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { addReview } from '../../store/review';

class ReviewForm extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleSubmit = _ => {
    const newReview = { ...this.props.forms.review };
    newReview.userId = this.props.user.id;
    newReview.productId = this.props.match.params.id;
    newReview.rating = this.state.rating;
    this.props.addReview(newReview.userId, newReview);
  };

  handleRate = (e, { rating }) => {
    this.setState({ rating });
  };

  render() {
    return (
      <Form model="review" onSubmit={val => this.handleSubmit(val)} className="ui form">
        <div className="field">
          <label>Subject:</label>
          <Control.text model=".subject" id="review.subject" />
        </div>
        <br />
        <div className="field">
          <label>Rating:</label>
        </div>
        <div className="ui huge star rating">
          <Rating icon="star" defaultRating={0} maxRating={5} onRate={this.handleRate} />
        </div>
        <br />
        <div className="field">
          <label>Review:</label>
          <Control.textarea model=".body" id="review.body" />
          <br />
        </div>
        <br />
        <button className="ui button">Submit!</button>
      </Form>
    );
  }
}

/*-----------cotainer------------*/
const mapState = ({ user, forms }) => ({ user, forms });
const mapDispatch = { addReview };

export default withRouter(connect(mapState, mapDispatch)(ReviewForm));

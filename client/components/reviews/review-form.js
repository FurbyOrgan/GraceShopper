
import React from 'react';
import {connect} from 'react-redux';
import { Control, Form, actions } from 'react-redux-form';
import { Rating } from 'semantic-ui-react';

import {addReview} from '../../store/review'


class ReviewForm extends React.Component{
    constructor (){
        super()
        this.state = {

        }
    }

    

    handleSubmit = (val) => {
        
        this.setState(this.props.forms.review)
        console.log(this.state)
    }

    handleRate = (e, {rating}) => {
        this.setState({rating})

    }


render(){
    const RatingExampleRating = () => (
        <Rating icon='star' defaultRating={0} maxRating={5}/>
      )
      console.log(this.state)
      console.log(this.props, "props?")
    return(
        <Form model="review" onSubmit={(val) => this.handleSubmit(val)} className="ui form">
        <div className="field">
        <label>Subject:</label>
        <Control.text model=".subject" id="review.subject"/>
        </div>
        <br></br>
        <div className="field">
        <label>Rating:</label>
        </div>
        <div className="ui huge star rating">
        <Rating icon='star' defaultRating={0} maxRating={5} onRate={this.handleRate}/>
        </div><br></br>
        <div className="field">
        <label>Review:</label>
        <Control.textarea  model=".body" id="review.body"/>
        <br></br>
        </div>
        <br></br>
        <button className="ui button">Submit!</button>
        </Form>


     


    )
}

}

/*-----------cotainer------------*/
const mapState = ({ user, forms }) => ({ user, forms });
const mapDispatch = {addReview};

export default connect(mapState, mapDispatch)(ReviewForm)

import React from 'react';
import {connect} from 'react-redux';
import { Control, Form, actions } from 'react-redux-form';
import { Rating } from 'semantic-ui-react'


class ReviewForm extends React.Component{
    constructor (){
        super()
        this.state = {

        }
    }

    

    handleSubmit = (val) => console.log(val)
    handleRate = (e, { rating }) => this.setState({ rating })


render(){
    const RatingExampleRating = () => (
        <Rating icon='star' defaultRating={0} maxRating={5}/>
      )
      console.log(this.state)
    return(
        <Form model="review" onSubmit={(val) => this.handleSubmit(val)}>
        <label>Subject:</label>
        <Control.text model=".subject" id="review.subject"/>
        <br></br>
        <label>Rating:</label>
        <Rating icon='star' model=".rating" defaultRating={0} maxRating={5} onRate={this.handleRate}/>
        <label>Review:</label>
        <Control.text model=".body" id="review.body"/>
        <br></br>

        <button>Submit!</button>
        </Form>


     


    )
}

}

/*-----------cotainer------------*/
const mapState = ({ user, forms }) => ({ user, forms });;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(ReviewForm)

import React from 'react';
import {connect} from 'react-redux';
import { Control, Form, actions } from 'react-redux-form';


class ReviewForm extends React.Component{
    constructor (){
        super()
        // this.state = {
        //     starsSelected: 0
        //   }
        //   this.changeStar = this.changeStar.bind(this)
    }

    handleSubmit(val) {
        console.log(val)
      }
    // changeStar(starsSelected){
    //     this.setState({starsSelected})
    // }


render(){
    return(
        <Form model="review" onSubmit={(val) => this.handleSubmit(val)}>
        <label>Subject:</label>
        <Control.text model=".subject" id="review.subject"/>
        <br></br>
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
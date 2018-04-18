import React from 'react';
import {connect} from 'react-redux';
import {Control, Form} from 'react-redux-form';



class ReviewForm extends React.Component{
    constructor (){
        super()
        // this.state = {
        //     starsSelected: 0
        //   }
        //   this.changeStar = this.changeStar.bind(this)
    }

    handleSubmit(val) {
        
      }
    // changeStar(starsSelected){
    //     this.setState({starsSelected})
    // }


render(){
    return(
        <Form model="review" onSubmit={(review) => this.handleSubmit(review)}>
        <label>Subject:</label>
        <Control.text model="user.subject" id="review.subject"/>
        <br></br>
        <label>Review:</label>
        <Control.text model="review.body" id="review.body"/>
        <br></br>

        <button>Submit!</button>
        </Form>


     


    )
}

}

/*-----------cotainer------------*/
const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(ReviewForm)


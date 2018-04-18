import React from 'react';
import {connect} from 'react-redux';
import {Control, Form} from 'react-redux-form';



class reviewForm extends React.Component{

    handleSubmit(val) {
        
      }


render(){
    return(
        <Form model="review" onSubmit={(review) => this.handleSubmit(review)}>
        <label htmlFor="user.subject">Subject:</label>
        <Control.text model="user.subject" id="user.subject"/>
        <label htmlFor="user.body">Review:</label>
        <Control.text model="user.body" id="user.body"/>

        <button>Submit!</button>
        </Form>


    )
}

}

export default reviewForm;


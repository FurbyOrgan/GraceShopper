import React from 'react';
import {connect} from 'react-redux';
import {Control, Form} from 'react-redux-form';



class reviewForm extends React.Component{
    constructor (){
        super()
        this.state = {
            starsSelected: 0
          }
          this.changeStar = this.changeStar.bind(this)
    }

    handleSubmit(val) {
        
      }
    changeStar(starsSelected){
        this.setState({starsSelected})
    }


render(){
    const {totalStars} = this.props;
    const {starsSelected} = this.state;
    return(
        <Form model="review" onSubmit={(review) => this.handleSubmit(review)}>
        <label htmlFor="user.subject">Subject:</label>
        <Control.text model="user.subject" id="user.subject"/>
        <div className="star-rating">
          {[1,2,3,4,5].map((n, i) =>
               <Star key={i}
                     selected={i < starsSelected}
                     onClick={() => this.change(i+1)}
              />
            )}
            <p>{starsSelected} of {totalStars} stars</p>
        </div>
        <label htmlFor="user.body">Review:</label>
        <Control.text model="user.body" id="user.body"/>

        <button>Submit!</button>
        </Form>


    )
}

}

export default reviewForm;


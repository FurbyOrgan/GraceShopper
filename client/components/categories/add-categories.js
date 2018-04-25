import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Container, Form, Input, TextArea } from 'semantic-ui-react';
import {addCategory} from '../../store/categories'






class AddCategories extends Component {

    constructor (props){
        super(props)
        this.state = {
    
        }
        
    }

handleChange = ( event, {value}) => { 
    
        const name = event.target.name;
        this.setState( { [name]: event.target.value})
        console.log('state: ', this.state)
        
}

handleSubmit =  () => {
    console.log(this.state)
   this.props.addCategory(this.state)
}



render (){
    return(
        <Container text className="viewHeight">
        <Form onSubmit={this.handleSubmit}>
            
                <Form.Field control={Input} label="Category Name" placeholder="" name='name' value={this.state.value} onChange={this.handleChange} />
                <Form.Field control={TextArea} label="Description" placeholder="" name='description' value={this.state.value} onChange={this.handleChange}/>
            
            
            <Form.Group inline>
                <Form.Field control={Button} content='Add Category' />
               
            </Form.Group>
        </Form>
    </Container>
    )
}

}




const mapState = ({user, categories }) =>( {user, categories });

const mapDispatch = {addCategory}

export default connect(mapState, mapDispatch)(AddCategories )
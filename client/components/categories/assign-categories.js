import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryList from './category-list'






class AssignCategories extends Component {




render (){
    return(
        <div>
        <h2>Assign Categories</h2>
        <CategoryList/>
        </div>
    )
}

}




const mapState = ({user, categories }) =>( {user, categories });

const mapDispatch = null

export default connect(mapState, mapDispatch)(AssignCategories )
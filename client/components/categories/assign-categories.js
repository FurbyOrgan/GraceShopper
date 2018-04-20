import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryList from './category-list'
import ProductList from '../../components/products/product-list'






class AssignCategories extends Component {




render (){
    return(
        <div>
        <h2>Assign Categories</h2>
        
        <CategoryList/>
        <ProductList/>
        </div>
    )
}

}




const mapState = ({user, categories }) =>( {user, categories });

const mapDispatch = null

export default connect(mapState, mapDispatch)(AssignCategories )
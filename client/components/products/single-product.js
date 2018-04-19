import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image as ImageComponent, Grid, Segment, Divider } from 'semantic-ui-react';

class SingleProduct extends Component {

    render() {
        const product = this.props.currentProduct
        const reviews = this.props
        console.log(product, reviews)
        if(!product) return(<div />)
        return (
            <div>
               <h3>{product.title}</h3>
               <h4>{product.price}</h4>
               <h6>{product.inventory}</h6>
               <p>{product.description}</p>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentProduct: state.products.filter(product => {
            return product.id === Number(ownProps.match.params.id)
        })[0],
        productReviews: state.reviews.filter(review =>{
            return review.productId ===  Number(ownProps.match.params.id)
        })[0]

    }

}
export default connect(mapStateToProps, null)(SingleProduct);

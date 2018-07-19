import PropTypes   from 'prop-types'
import React       from 'react';
import { connect } from 'react-redux';

import {
  Container,
  Item
} from 'semantic-ui-react'

import ProductListItem from './product-list-item';

const ProductList = ({ products }) => (
  <Container text>
    {!products.length ? <h3>No products available</h3> : <div />}
    <Item.Group divided>
      {products.map(productElement =>
        <ProductListItem key={productElement.id} product={productElement} review={2} />
      )}
    </Item.Group>
  </Container>
)

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = (state, ownProps) => (
  ownProps.filteredProducts
  ? { products: ownProps.filteredProducts, reviews: state.reviews }
  : { products: state.products, reviews: state.reviews }
)

export default connect(mapStateToProps, null)(ProductList);

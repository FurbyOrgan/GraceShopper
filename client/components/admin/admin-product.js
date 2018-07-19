import PropTypes   from 'prop-types'
import React       from 'react'
import { connect } from 'react-redux'

import {
  Container,
  Header,
  Item
} from 'semantic-ui-react'

import AdminProductItem from './admin-product-item';

const AdminProductList = ({ products }) => (
  <Container text>
    <Header as="h3">{products.length} Products in Inventory</Header>
    <Item.Group divided>
      {products.map(productElement =>
        <AdminProductItem key={productElement.id} product={productElement} />
      )}
    </Item.Group>
  </Container>
)

AdminProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = (state, ownProps) => (
  ownProps.filteredProducts
    ? { products: ownProps.filteredProducts }
    : { products: state.products }
)

export default connect(mapStateToProps, null)(AdminProductList)

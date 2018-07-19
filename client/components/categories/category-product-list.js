import React from 'react'
import { connect } from 'react-redux'
import { Header, Icon } from 'semantic-ui-react'

import ProductList from '../products/product-list'

const CategoryProductList = ({ category, result }) => (
  <div textAlign="center">
    <Header as="h2" icon textAlign="center">
      <Icon name="tag" circular />
      Products in {category.name}
    </Header>
    <hr />
    <ProductList filteredProducts={result} />
  </div>
)

const mapStateToProps = (state, ownProps) => {
  return {
    result: state.products.filter(product => {
      const categories = product.categories;
      let includesCategory = false;
      categories.forEach(
        category => (category.id == ownProps.match.params.categoryId ? (includesCategory = true) : false)
      )
      return includesCategory;
    }),
    category: state.categories.filter(category => category.id == ownProps.match.params.categoryId)[0]
  }
}
export default connect(mapStateToProps, null)(CategoryProductList)

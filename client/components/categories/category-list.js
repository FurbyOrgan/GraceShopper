import PropTypes   from 'prop-types'
import React       from 'react'
import { connect } from 'react-redux'

import {
  Container,
  Icon,
  Item,
  Header
} from 'semantic-ui-react'

import CategoryListItem from './category-list-item'

const CategoryList = ({ categories }) => (
  <Container text className="viewHeight">
    <Header as="h2" icon textAlign="center">
      <Icon name="tag" circular />
      Categories
    </Header>
    <Item.Group divided>
      {categories.map(categoryElement => <CategoryListItem key={categoryElement.id} category={categoryElement} />)}
    </Item.Group>
  </Container>
)

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = ({ user, categories }) => ({ user, categories })

export default connect(mapStateToProps, null)(CategoryList)


import PropTypes from 'prop-types'
import React     from 'react'
import { Link }  from 'react-router-dom'
import { Item }  from 'semantic-ui-react'

const CategoryListItem = ({ category }) => (
  <Item>
    <Item.Content>
      <Item.Header as={Link} to={`/categories/${category.id}`}>
        <h3>{category.name}</h3>
      </Item.Header>
      <Item.Description>{category.description}</Item.Description>
    </Item.Content>
  </Item>
)

CategoryListItem.propTypes = {
  category: PropTypes.object
}

export default CategoryListItem;

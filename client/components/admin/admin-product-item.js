import React       from 'react'
import { Link }    from 'react-router-dom'
import { connect } from 'react-redux'

import {
  Item,
  Label,
  Button
} from 'semantic-ui-react'

import CategoryLabel     from '../categories/category-label'
import { removeProduct } from '../../store/products'

const AdminProductItem = props => {
  const product = props.product
    return (
      <Item>
        <Item.Image src={product.imageUrl} />
        <Item.Content>
          <Item.Header as={Link} to={`/products/${product.id}/edit`}>{product.title}</Item.Header>
          <Item.Meta>
            <Label tag>${product.price}</Label>
          </Item.Meta>
          <Item.Description>{product.description}</Item.Description>
          <Item.Extra>
            {product.inventory > 0 ? <h4>{product.inventory} in stock</h4> : <h4>Item out of stock</h4>}
          </Item.Extra>
          <Item.Extra>
            {product.categories.map(category =>
              <CategoryLabel key={category.id} id={category.id} />
            )}
          </Item.Extra>
          <Item.Extra>
            <Button.Group color="teal" size="tiny">
              <Button as={Link} to={`/products/${product.id}/edit`}>Edit</Button>
              <Button.Or />
              <Button onClick={() => props.removeProduct(product.id)}>Delete</Button>
            </Button.Group>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
}

const mapDispatch = { removeProduct }

export default connect(null, mapDispatch)(AdminProductItem)

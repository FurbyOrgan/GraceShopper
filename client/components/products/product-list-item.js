import React from 'react';
import { Link } from 'react-router-dom';
import { Item, Label, Rating } from 'semantic-ui-react';
import CategoryLabel from '../categories/category-label';
import CartAddButton from '../cart/cart-add-button';

const ProductListItem = ({ product }) => {
  return (
    <Item>
      <Item.Image src={product.imageUrl} />
      <Item.Content>
        <Item.Header as={Link} to={`/products/${product.id}`}>
          {product.title}
        </Item.Header>
        <Item.Meta>
          <Label tag>${product.price}</Label>
        </Item.Meta>
        <Rating icon="star" rating={Math.round(product.averageRating)} maxRating={5} disabled /> {`(${product.reviewCount})`}
        <Item.Description>{product.description}</Item.Description>
        <Item.Extra>
          {product.inventory > 0 ? <CartAddButton product={product} /> : <h4>Item out of stock</h4>}
        </Item.Extra>
        <Item.Extra>
          {product.categories.map(category => <CategoryLabel key={category.id} id={category.id} />)}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default ProductListItem;

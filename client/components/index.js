/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

/**
 * Checkout Components
 */
export {default as CheckoutForm} from './checkout/checkout-form'

/**
 * Cart Components
 */
export {default as CartList}   from './cart/cart-list'
export {default as CartButton} from './cart/cart-add-button'

/**
 * Category Components
 */
export {default as AssignCategories}    from './categories/assign-categories'
export {default as CategoryList}        from './categories/category-list'
export {default as CategoryLabel}       from './categories/category-label'
export {default as CategoryProductList} from './categories/category-product-list'

/**
 * Orders Components
 */
export {default as OrderList} from './orders/order-list'

/**
 * Product Components
 */
export { default as SingleProduct } from './products/single-product'
export {default as EditProduct} from './products/edit-product'
export {default as ProductList}     from './products/product-list'
export {default as ProductListItem} from './products/product-list-item'
export {default as UserHome}        from './user-home'

/**
 * Orders Components
 */
export {default as EditOrder} from './orders/edit-order'

/**
 * Reviews Components
 */
export {default as ReviewForm}  from './reviews/review-form'
export {default as UserReviews} from './reviews/user-reviews'

/**
 * Search Components
 */
export {default as SearchBar}     from './common/search-bar'
export {default as SearchResults} from './common/search-results'

/**
 * Other Components
 */
export { Login, Signup }   from './auth-form'
export {default as Navbar} from './navbar'


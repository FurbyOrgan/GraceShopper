import React from 'react'

export default function SingleProduct(props) {
    const product = props;
    return (
        <div>
            <h3>{product.name}</h3>
            <img src={ product.imageUrl } className="img-thumbnail" />
            <h4>{product.price}</h4>
            <h6>{product.inventory}</h6>
            <p>{product.desc}</p>
            <ul>
                <li>{product.categories}</li>
            </ul>
        </div>
    );
}
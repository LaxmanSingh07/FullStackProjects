import React from 'react'
import './Product.scss'
function Product({ name, Image, price }) {
  return (
    <div className='Product'>
      <div className="product-container">
        <div className="img-container">
          <img src={Image} alt="Products" id='image' />
        </div>
        <div className="proudct-info">
          <p className="title">
            <h2>{name}</h2>
            <p className='price'>{price}</p>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Product
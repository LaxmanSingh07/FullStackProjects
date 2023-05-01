import React from 'react'
import './Category.scss'
function Category({title,img}) {
  return (
    <div className='category'>
    <div className="Category-content">

      <img src={img} alt="Not Fetched" className='cat-img'/>
          <h3 className='heading'>{title}</h3>
        </div>
    </div>
  )
}

export default Category
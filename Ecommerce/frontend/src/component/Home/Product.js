import React from 'react'
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const options={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    size:window.innerWidth<800?20:25,
    activeColor:"tomato",
    value:2.5 ,
    isHalf:true, 

}
const Product = ({product}) => {
  return (
    <Link className='productCard'
 to={product.id}>
    <img src={product.images[0].url} alt={product.name} />
    <p>{product.name}</p>
    <div>
        <ReactStars {...options}/>
        <span>(256 Reviews)</span>
    </div>
    <span>₹50000</span>
 </Link>  )
}

export default Product
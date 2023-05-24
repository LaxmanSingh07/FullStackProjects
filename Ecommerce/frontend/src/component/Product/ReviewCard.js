import React from 'react'
import ReactStars from "react-rating-stars-component";
import profilePng from '../../images/profile.png'

const ReviewCard = ({review}) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        size: window.innerWidth < 800 ? 20 : 25,
        activeColor: "tomato",
        value: review.ratings,
        isHalf: true,
      };
    return (
    <div className='reviewCard'>
        <img src={profilePng} alt='User'/>
        <p>{review.name}</p>
        <ReactStars {...options} />
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
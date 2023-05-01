import React from 'react'
import './Hero.scss'
function Hero() {
  return (
    <div className='Hero'>
      <div className="hero-content">
        <h2 className='heading'>ArtWork Exclusive</h2>
        <p className="sub-heading">
          Art it love of beauty, in all its forms, is the noblest gift of the human heart.
        </p>

        <button className="cta btn-primary">
          Explore more
        </button>
      </div>
    </div>
  )
}

export default Hero
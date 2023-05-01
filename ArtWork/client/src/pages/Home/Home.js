import React from 'react'
import Hero from '../../components/Hero/Hero'
import './Home.scss'
import Category from '../../components/Category/Category'
import Product from '../../components/Product/Product'
import { categories,products } from '../../data'
function Home() {
 


  return (
    <div className='Home'>
      <Hero />
      <section className="collections container">
        <div className="info">
          <h2 className="heading">Shop By Categories</h2>
          <p className="sub-heading">
            Shop our collections of art prints, posters, and framed wall art.
          </p>
          <div className="content">

            {

              categories.map((category, index) => (
                <Category key={index} title={category.title} img={category.img} />
              ))

            }



          </div>
        </div>
      </section>
      <section className="collections container">
        <div className="info">
          <h2 className="heading">Our Top Picks</h2>
          <p className="sub-heading">
            Our top picks for you to choose from.
          </p>
          <div className="content">
            {
              products.map((product, index) => (
                <Product key={index} name={product.name} Image={product.Image} price={product.price} />
              ))
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
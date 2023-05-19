import React from "react";
// import { Link } from 'react-router-dom'
import "./Home.css";
import Product from "./Product.js";
import { CgMouse } from "react-icons/cg";

const product = {
  name: "Mac Book",
  images: [
    {
      url: "https://images.unsplash.com/photo-1455894127589-22f75500213a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFjJTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60",
    },
    { url: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" },
  ],
  price: "₹200000",
  _id: "Surya",
};
const Home = () => {
  return (
    <>
      <div className="banner">
        <p>Welcome to our E-commerce</p>
        <h1>Buy your favourite products</h1>

        <a href="#product-container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="product-container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </>
  );
};

export default Home;

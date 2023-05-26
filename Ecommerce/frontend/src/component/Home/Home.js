import React, { useEffect } from "react";
// import { Link } from 'react-router-dom'
import "./Home.scss";
import Product from "./ProductCard.js";
import { CgMouse } from "react-icons/cg";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert =useAlert();
  const dispatch = useDispatch();
  const {loading,productsCount,error,  products } = useSelector(
    (state) => state.product
  );
  // console.log(products);
  useEffect(() => {

    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }
    dispatch(getProduct()); // 
  }, [dispatch,error,alert]);

  return (
  <>
  {loading?<Loader/>:(
    <>
    <MetaData title={"Buy Best Products Online"} />
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
      {products && products.map((product) => <Product product={product} />)}
      

    </div>
  </>  
  )
  }
  </>
  );
};

export default Home;

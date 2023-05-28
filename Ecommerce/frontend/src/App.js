import React from "react";
// import { useEffect } from 'react';
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./component/Home/Home.js";
import Products from "./component/Product/Products.js"
// import Loader from "./component/layout/Loader/Loader.js";
import "./App.scss"
import ProductDetails from "./component/Product/ProductDetails.js";

const App = () => {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* <Route path="/temp" element={<Loader/>} /> */}
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/products" element={<Products/>} />
        </Routes>
      <Footer />
    </Router>
  );
};

export default App;

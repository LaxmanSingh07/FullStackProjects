import React from "react";
// import { useEffect } from 'react';
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./component/Home/Home.js";
// import Loader from "./component/layout/Loader/Loader.js";
import ProductDetails from "./component/Produc/ProductDetails";

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
        </Routes>
      <Footer />
    </Router>
  );
};

export default App;

import React from "react";
import "./Loader.scss";
const Loader = () => {
  return (
    <div className="card">
    <div className="shimmerBG media"></div>
    <div className="p-32">
      <div className="shimmerBG title-line"></div>
      <div className="shimmerBG title-line end"></div>
      <div className="shimmerBG content-line m-t-24"></div>
      <div className="shimmerBG content-line"></div>
      <div className="shimmerBG content-line"></div>
      <div className="shimmerBG content-line"></div>
      <div className="shimmerBG content-line end"></div>
    </div>
  </div>
  );
};

export default Loader;

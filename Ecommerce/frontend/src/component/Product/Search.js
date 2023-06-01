import React, { useState } from "react";
import "./Search.scss";
import { useNavigate } from "react-router-dom";
import "./Search.scss"

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const  searchSumbitHandler = (e) => {
    e.preventDefault();
    if(keyword.trim()) 
    {
        navigate(`/products/${keyword}` );
    }
    else{
        navigate(`/products`);
    }     
  }
  return (
    <>
      <form action="" className="searchBox" onSubmit={searchSumbitHandler}>
        <input
          type="text"
          className="searchField"
          placeholder="Enter Product Name"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" className="searchBtn"/>
      </form>
    </>
  );
};

export default Search;

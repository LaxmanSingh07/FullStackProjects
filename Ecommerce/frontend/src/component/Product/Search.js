import React, { useState } from "react";
import "./Search.scss";
const Search = ({history}) => {
  const [keyword, setKeyword] = useState("");
  const  searchSumbitHandler = (e) => {
    e.preventDefault();
    if(keyword.trim()) 
    {
        history.pushState(`/products/${keyword}`);
    }
    else{
        history.pushState(`/products`);
    }
    console.log(keyword);
     
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

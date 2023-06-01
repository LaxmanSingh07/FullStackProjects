import React, { useEffect, useState } from "react";
import "./Products.scss";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination"
const Products = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const { products, loading, error, productsCount,resultPerPage } = useSelector(
    (state) => state.product
  );

const setCurrentPageNo=(pageNumber)=>{
  setCurrentPage(pageNumber);
}

  useEffect(() => {
    dispatch(getProduct(keyword));
  }, [dispatch, keyword]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="prouctsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>

          <div className="paginationBox">
            <Pagination 
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText={"Next"}
              prevPageText={"Prev"}
              firstPageText={"First"}
              lastPageText={"Last"}
              itemClass="page-item"
              linkClass="page-link"
              activeClass="page-item-active"
              activeLinkClass="page-link-active"
              />
          </div>
        </>
      )}
    </>
  );
};

export default Products;

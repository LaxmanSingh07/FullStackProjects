import React, { useEffect } from "react";
import "./Products.scss"
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";

const Products = () => {
  const dispatch = useDispatch();

  const { Products, loading, error, productsCount } = useSelector(
    (state) => state.Products
  );
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  return <>{loading ? <Loader /> :
   <>
    <h2 className="prouctsHeading">Products</h2>
    <div className="products">
        {Products.map((product)=>{
            <ProductCard key={product.id} product={product}/>
        })}
    </div>
  </>}
  
  </>;
};

export default Products;

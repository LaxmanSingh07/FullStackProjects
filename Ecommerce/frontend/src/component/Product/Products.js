import React, { useEffect } from "react";
import "./Products.scss"
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
const params=useParams;
const Products = () => {
  const dispatch = useDispatch();

  const { products, loading, error, productsCount } = useSelector(
    (state) => state.product
  );

  const keyword=params.keyword;

  useEffect(() => {
    dispatch(getProduct(keyword));
  }, [dispatch,keyword]);
  return (<>{loading ?( <Loader />) :
   <>
    <h2 className="prouctsHeading">Products</h2>
    <div className="products">
        {products &&products.map((product)=>(
            <ProductCard key={product.id} product={product}/>
        ))}
    </div>
  </>}
  
  </>
  );
};

export default Products;

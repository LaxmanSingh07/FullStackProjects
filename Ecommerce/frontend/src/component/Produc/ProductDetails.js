import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./ProductDetails.scss";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import { useParams } from 'react-router-dom';


const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  
  const id;
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
    );
    React.useEffect(() => {
      dispatch(getProductDetails(id));
    }, [dispatch, match.params.id]);
    
    return (
      <>
       { id } = useParams();
      <div className="ProductDetails">
        <Carousel>
          {product.images.map((item, index) => (
            <img
              className="CarouselImg"
              key={item._id}
              src={item.url}
              alt={`${index} slide`}
            />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default ProductDetails;

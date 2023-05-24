import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import "./ProductDetails.scss";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  // console.log(product);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    size: window.innerWidth < 800 ? 20 : 25,
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id,error,alert]);

  return (
    <>
    {loading?(<Loader/>):(
    <>
      <div className="ProductDetails">
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, index) => (
                <img
                  className="CarouselImg"
                  key={item._id}
                  src={item.url}
                  alt={`${index} slide`}
                />
              ))}
          </Carousel>
        </div>

        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product #{product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <ReactStars {...options} />
            <span>{product.numOfReviews} Reviews</span>
          </div>

          <div className="detailsBlock-3">
            <h1> {product.price}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button>-</button>
                <input type="number" value={1} />
                <button>+</button>
              </div>
              <button>Add to Cart</button>
            </div>
            <p>
              status
              <b className={product.stock > 0 ? "greenColor" : "redColor"}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>

          <button className="submitReview">Submit Review</button>
        </div>
      </div>

      <h3 className="reviewsHeading">REVIEWS</h3>
                
      {product.reviews && product.reviews[0]?(
        <div className="reviews">
          {product.reviews &&
          product.reviews.map((review) => 
            <ReviewCard review={review} />)}
        </div>
      ):(
       
       <p className="noReviews">No Reviews Yet</p>   
      )}

    </>
      )}
    </>
  );
};

export default ProductDetails;

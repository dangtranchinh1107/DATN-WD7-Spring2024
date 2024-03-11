import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "../../assets/css/home.css";

const ProductItem = ({ product }) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="item4">
        {/* <img
          className="card-img-top mx-auto"
          src={product?.image[0]?.url}
          alt=""
        /> */}
        <p>
          <Link to={`/product/${product?._id}`}>{product?.name}</Link>
        </p>
        <span className="price">${product?.price}</span>
        <div className="danhgia">
          <StarRatings
            rating={product?.ratings}
            starRatedColor="#ffb829"
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            starSpacing="1px"
          />
          <span id="no_of_reviews" className="pt-2 ps-2">
            {" "}
            ({product?.numOfReviews})
          </span>
        </div>
        <Link
          to={`/product/${product?._id}`}
          id="view_btn"
          className="buy-button btn bg-danger"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;

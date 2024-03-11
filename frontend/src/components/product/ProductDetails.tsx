import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { useGetProductDetailsQuery } from "../../redux/api/productsApi";
=======
import { useGetProductsDetailsQuery } from "../../redux/api/productsApi";
>>>>>>> 69c59227f07d28bce4fff8316b8f86d7438ac64c
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import StarRatings from "react-star-ratings";
<<<<<<< HEAD
import { useDispatch } from "react-redux";
import { setCartItem } from "../../redux/features/cartSlice";
import MetaData from "../layout/MetaData";

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState("1");
  const [activeImg, setActiveImg] = useState("");

  const { data, isLoading, error, isError } = useGetProductDetailsQuery(
=======

const ProductDetails = () => {
  const params = useParams();

  const { data, isLoading, error, isError } = useGetProductsDetailsQuery(
>>>>>>> 69c59227f07d28bce4fff8316b8f86d7438ac64c
    params?.id
  );
  const product = data?.product;

<<<<<<< HEAD
=======
  const [activeImg, setActiveImg] = useState("");

>>>>>>> 69c59227f07d28bce4fff8316b8f86d7438ac64c
  useEffect(() => {
    setActiveImg(
      product?.images[0]
        ? product?.images[0]?.url
        : "/images/default_product.png"
    );
  }, [product]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
<<<<<<< HEAD
  }, [error]);

  const increseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber >= product?.stock) return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };
  const decreseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber <= 1) return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const setItemToCart = () => {
    const cartItem = {
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0]?.url,
      stock: product?.stock,
      quantity,
    };

    dispatch(setCartItem(cartItem));
    toast.success("Thêm vào giỏ hàng thành công!");
  };

  if (isLoading) return <Loader />;
  return (
    <>
      <MetaData title={product} />
      <div className="row d-flex justify-content-around">
        {/* <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <div className="p-3">
          <img
            className={`d-block border rounder p-3 cursor-pointer ${
              img.url === activeImg ? "border-warning" : ""
            }`}
=======
  }, [isError]);

  if (isLoading) return <Loader />;

  return (
    <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <div className="p-3">
          <img
            className="d-block w-100"
>>>>>>> 69c59227f07d28bce4fff8316b8f86d7438ac64c
            src={activeImg}
            alt={product?.name}
            width="340"
            height="390"
          />
        </div>
        <div className="row justify-content-start mt-5">
          {product?.images?.map((img) => (
            <div className="col-2 ms-4 mt-2">
              <a role="button">
                <img
<<<<<<< HEAD
                  className="d-block border rounded p-3 cursor-pointer"
=======
                  className={`d-block border rounded p-3 cursor-pointer ${
                    img.url === activeImg ? "border-warning" : ""
                  } `}
>>>>>>> 69c59227f07d28bce4fff8316b8f86d7438ac64c
                  height="100"
                  width="100"
                  src={img?.url}
                  alt={img?.url}
                  onClick={(e) => setActiveImg(img.url)}
                />
              </a>
            </div>
          ))}
        </div>
<<<<<<< HEAD
      </div> */}

        <div className="col-12 col-lg-5 mt-5">
          <h3>{product?.name}</h3>
          <p id="product_id">Product # {product?._id}</p>

          <hr />

          <div className="d-flex">
=======
      </div>

      <div className="col-12 col-lg-5 mt-5">
        <h3>{product?.name}</h3>
        <p id="product_id">Product # {product?._id}</p>

        <hr />

        <div className="d-flex">
          <div className="star-ratings">
>>>>>>> 69c59227f07d28bce4fff8316b8f86d7438ac64c
            <StarRatings
              rating={product?.rating}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name="rating"
<<<<<<< HEAD
              startDimension="24px"
              starSpacing="1px"
            />
            <span id="no-of-reviews" className="pt-1 ps-2">
              {" "}
              ({product?.numOfReviews} Reviews){" "}
            </span>
          </div>
          <hr />

          <p id="product_price">$ {product?.price}</p>
          <div className="stockCounter d-inline">
            <span className="btn btn-danger minus" onClick={decreseQty}>
              -
            </span>
            <input
              type="number"
              className="form-control count d-inline"
              value={quantity}
              readOnly
            />
            <span className="btn btn-primary plus" onClick={increseQty}>
              +
            </span>
          </div>
          <button
            type="button"
            id="cart_btn"
            className="btn btn-primary d-inline ms-4"
            disabled={product.stock <= 0}
            onClick={setItemToCart}
          >
            Add to Cart
          </button>

          <hr />

          <p>
            Status:{" "}
            <span
              id="stock_status"
              className={product?.stock > 0 ? "greenColor" : "redColor"}
            >
              {product?.stock > 0 ? "Còn hàng" : "Hết hàng"}
            </span>
          </p>

          <hr />

          <h4 className="mt-2">Description:</h4>
          <p>{product?.description}</p>
          <hr />
          <p id="product_seller mb-3">
            Sold by: <strong>{product?.seller}</strong>
          </p>

          <div className="alert alert-danger my-5" type="alert">
            Login to post your review.
          </div>
        </div>
      </div>
    </>
=======
              starDimension="24px"
              starSpacing="1px"
            />
          </div>
          <span id="no-of-reviews" className="pt-1 ps-2">
            {" "}
            ({product?.numOfReviews} Reviews){" "}
          </span>
        </div>
        <hr />

        <p id="product_price">${product?.price}</p>
        <div className="stockCounter d-inline">
          <span className="btn btn-danger minus">-</span>
          <input
            type="number"
            className="form-control count d-inline"
            value="1"
            readOnly
          />
          <span className="btn btn-primary plus">+</span>
        </div>
        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ms-4"
          disabled
        >
          Add to Cart
        </button>

        <hr />

        <p>
          Status:{" "}
          <span
            id="stock_status"
            className={product?.stock > 0 ? "greenColor" : "redColor"}
          >
            {product?.stock > 0 ? "In stock" : "Out of Stock"}
          </span>
        </p>

        <hr />

        <h4 className="mt-2">Description:</h4>
        <p>{product?.description}</p>
        <hr />
        <p id="product_seller mb-3">
          Sold by: <strong>{product?.seller}</strong>
        </p>

        <div className="alert alert-danger my-5" role="alert">
          Login to post your review.
        </div>
      </div>
    </div>
>>>>>>> 69c59227f07d28bce4fff8316b8f86d7438ac64c
  );
};

export default ProductDetails;

import React, { useEffect, useState } from "react";
import { useGetProductsDetailsQuery } from "../../redux/api/productsApi";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import StarRatings from "react-star-ratings";

const ProductDetails = () => {
  const params = useParams();

  const { data, isLoading, error, isError } = useGetProductsDetailsQuery(
    params?.id
  );
  const product = data?.product;
  // console.log(product);

  const [activeImg, setActiveImg] = useState("");

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
  }, [isError]);

  if (isLoading) return <Loader />;

  return (
    <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <div className="p-3">
          <img
            className="d-block w-100"
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
                  className={`d-block border rounded p-3 cursor-pointer ${
                    img.url === activeImg ? "border-warning" : ""
                  } `}
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
      </div>

      <div className="col-12 col-lg-5 mt-5">
        <h3>{product?.name}</h3>
        <p id="product_id">Sản phẩm # {product?._id}</p>

        <hr />

        <div className="">
          <div className="star-ratings  mb-3">
            <StarRatings
              rating={product?.rating}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name="rating"
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
          Thêm vào giỏ hàng
        </button>

        <hr />

        <p>
          Tình trạng:{" "}
          <span
            id="stock_status"
            className={product?.stock > 0 ? "greenColor" : "redColor"}
          >
            {product?.stock > 0 ? "Còn hàng" : "Hết hàng"}
          </span>
          ({product?.stock})
        </p>

        <hr />

        <h4 className="mt-2">Mô tả:</h4>

        <p>{product?.description}</p>

        <p>Màu sắc: {product?.color[0]?.name}</p>
        <p>Hãng sản xuất: {product?.category[0]?.name}</p>
        <p>CPU: {product?.cpu[0]?.type}</p>
        <p>Card đồ họa: {product?.graphicCard[0]?.type}</p>
        <p>Ổ cứng: {product?.hardDisk[0]?.type}</p>
        <p>Ram: {product?.ram[0]?.type}</p>
        <hr />
        <p id="product_seller mb-3">
          <p>Trạng thái: {product?.status}</p>
        </p>

        <div className="alert alert-danger my-5" role="alert">
          Login to post your review.
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

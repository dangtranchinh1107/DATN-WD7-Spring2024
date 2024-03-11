import React, { useEffect } from "react";
<<<<<<< HEAD
import MetaData from "../layout/MetaData";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import ProductItem from "../product/Productitem";
import "../../assets/js/index.js";

import "../../assets/css/home.css";

const HomePage = () => {
  const { data, isLoading, error, isError } = useGetProductsQuery([]);
=======
import { useGetProductsQuery } from "../../redux/api/productsApi";
import ProductItem from "../product/ProductItem";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";

const HomePage = () => {
  const { data, isLoading, error, isError } = useGetProductsQuery([]);

>>>>>>> 69c59227f07d28bce4fff8316b8f86d7438ac64c
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
<<<<<<< HEAD
  }, [error]);
  if (isLoading) return <Loader />;
  return (
    <>
      <MetaData title={"By Best Products Online"} />
      <div className="right">
        <div className="image-slider">
          <img
            className="image active"
            src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/2/638449855361141781_F-C1_1200x300.png"
            alt=""
          />
          <img
            className="image"
            src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/4/638451815694627811_F-C1_1200x300.png"
            alt=""
          />
          <img
            className="image"
            src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/2/638449855361141781_F-C1_1200x300.png"
            alt=""
          />
        </div>
      </div>

=======
  }, [isError]);

  if (isLoading) return <Loader />;

  return (
    <div className="container">
>>>>>>> 69c59227f07d28bce4fff8316b8f86d7438ac64c
      <div className="row">
        <div className="col-12 col-sm-6 col-md-12">
          <h1 id="products_heading" className="text-secondary">
            Latest Products
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
<<<<<<< HEAD
=======
              {/* <!-- Product Item 1 --> */}
>>>>>>> 69c59227f07d28bce4fff8316b8f86d7438ac64c
              {data?.products?.map((product) => (
                <ProductItem product={product} />
              ))}
            </div>
          </section>
        </div>
      </div>
<<<<<<< HEAD
    </>
=======
    </div>
>>>>>>> 69c59227f07d28bce4fff8316b8f86d7438ac64c
  );
};

export default HomePage;

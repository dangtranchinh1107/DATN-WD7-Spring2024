import React, { useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import ProductItem from "../product/Productitem";
import "../../assets/js/index.js";

import "../../assets/css/home.css";

const HomePage = () => {
  const { data, isLoading, error, isError } = useGetProductsQuery([]);
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
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

      <div className="row">
        <div className="col-12 col-sm-6 col-md-12">
          <h1 id="products_heading" className="text-secondary">
            Latest Products
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products?.map((product) => (
                <ProductItem product={product} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;

import React, { useState, useEffect } from "react";
import MetaData from "../layout/MetaData.jsx";
import { useGetProductsQuery } from "../../redux/api/productsApi.jsx";
import Loader from "../layout/Loader.jsx";
import toast from "react-hot-toast";
import ProductItem from "../product/Productitem.jsx";
import "../../assets/css/home.css";

const HomePage = () => {
  const { data, isLoading, error, isError } = useGetProductsQuery([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000); // Thời gian chuyển đổi ảnh

    return () => clearInterval(interval);
  }, [error, isError]);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"By Best Products Online"} />
      <div className="right">
        <div className="image-slider">
          <div>
            <button
              onClick={prevSlide}
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              onClick={nextSlide}
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <img
            className={`image ${currentIndex === 0 ? "active" : ""}`}
            src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/2/638449855361141781_F-C1_1200x300.png"
            alt=""
          />
          <img
            className={`image ${currentIndex === 1 ? "active" : ""}`}
            src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/2/638449857797599116_F-C1_1200x300.png"
            alt=""
          />
          <img
            className={`image ${currentIndex === 2 ? "active" : ""}`}
            src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/1/638449086705112725_F-C1_1200x300.png"
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
              {data?.products?.map((product, index) => (
                <ProductItem key={index} product={product} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;

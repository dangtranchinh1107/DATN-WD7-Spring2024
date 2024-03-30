import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import ProductItem from "../product/ProductItem";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import CustomPagination from "../layout/CustomPagination";
import { Link, useSearchParams } from "react-router-dom";
// import MetaData from "../layout/MetaData";
import Filters from "../layout/Filters";
import "../../assets/css/home.css";
// import { useGetCategoriesQuery } from "../../redux/api/categoryApi";

const HomePage = () => {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");
  console.log(category);

  const params = { page, keyword };

  min !== null && (params.min = min);
  max !== null && (params.max = max);
  category !== null && (params.category = category);
  ratings !== null && (params.ratings = ratings);

  const { data, isLoading, error, isError } = useGetProductsQuery(params);
  console.log(data);
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(data);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);
  //
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
  const columnSize = keyword ? 4 : 3;

  if (isLoading) return <Loader />;

  return (
    <>
      {/* <MetaData title="Mua sản phẩm tốt nhất trực tuyến" /> */}
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

      {/* Hiển thị Danh mục và Ảnh */}
      <div className="row mt-4 mb-4">
        <div className="col-md-2">
          <Link to="http://localhost:3000/?category=65b3ed3049d98167851d92f8">
            <img
              src="https://cdn.tgdd.vn/Brand/1/logo-hp-149x40-1.png"
              alt="Hp"
              class="img-fluid border rounded-pill shadow "
            />
          </Link>
        </div>

        <div className="col-md-2">
          <Link to="http://localhost:3000/?category=65b3ed8449d98167851d92fa">
            <img
              src="https://cdn.tgdd.vn/Brand/1/logo-asus-149x40.png"
              alt="Asus"
              class="img-fluid border rounded-pill shadow"
            />
          </Link>
        </div>
        <div className="col-md-2">
          <Link to="http://localhost:3000/?category=66052b23a1d3f9852da74a99">
            <img
              src="https://cdn.tgdd.vn/Brand/1/logo-acer-149x40.png"
              alt="Acer"
              class="img-fluid border rounded-pill shadow"
            />
          </Link>
        </div>
        <div className="col-md-2">
          <Link to="http://localhost:3000/?category=65b3ed8e49d98167851d92fc">
            <img
              src="https://cdn.tgdd.vn/Brand/1/logo-lenovo-149x40.png"
              alt="Lenovo"
              class="img-fluid border rounded-pill shadow"
            />
          </Link>
        </div>
        <div className="col-md-2">
          <Link to="http://localhost:3000/?category=65b3ed2249d98167851d92f6">
            <img
              src="https://cdn.tgdd.vn/Brand/1/logo-dell-149x40.png"
              alt="Dell"
              class="img-fluid border rounded-pill shadow"
            />
          </Link>
        </div>

        <div className="col-md-2">
          <Link to="http://localhost:3000/?category=65b3ed0e49d98167851d92f4">
            <img
              src="https://cdn.tgdd.vn/Brand/1/logo-macbook-149x40.png"
              alt="Macbook"
              class="img-fluid border rounded-pill shadow"
            />
          </Link>
        </div>
      </div>

      <div className="row">
        {keyword && (
          <div className="col-6 col-md-3 mt-5">{/* <Filters /> */}</div>
        )}
        <div className={keyword ? "col-6 col-md-9" : "col-6 col-md-12"}>
          <h1 id="products_heading" className="text-secondary">
            {keyword
              ? `${data?.products?.length} Sản phẩm được tìm thấy với từ khóa: ${keyword}`
              : "Sản phẩm mới nhất"}
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products?.map((product) => (
                <ProductItem product={product} columnSize={columnSize} />
              ))}
            </div>
          </section>

          <CustomPagination
            resPerPage={data?.resPerPage}
            productsFiltersCount={data?.productsFiltersCount}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;

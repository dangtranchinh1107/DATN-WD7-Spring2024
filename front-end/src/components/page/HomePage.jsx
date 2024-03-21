import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import ProductItem from "../product/ProductItem";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import CustomPagination from "../layout/CustomPagination";
import { useSearchParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Filters from "../layout/Filters";
import "../../assets/css/home.css";
// import { useGetCategoriesQuery } from "../../redux/api/categoryApi";

const HomePage = () => {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const categorys = searchParams.get("category");
  const ratings = searchParams.get("ratings");
  console.log(categorys);

  const params = { page, keyword };

  min !== null && (params.min = min);
  max !== null && (params.max = max);
  categorys !== null && (params.category = categorys);
  ratings !== null && (params.ratings = ratings);

  const { data, isLoading, error, isError } = useGetProductsQuery(params);
  const [currentIndex, setCurrentIndex] = useState(0);
  // console.log(data);

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
      <MetaData title="Mua sản phẩm tốt nhất trực tuyến" />
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
              <span class="visually-hidden">Trước </span>
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
              <span class="visually-hidden">Sau</span>
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
        {keyword && (
          <div className="col-6 col-md-3 mt-5">
            <Filters />
          </div>
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
                <ProductItem
                  key={product._id}
                  product={product}
                  columnSize={columnSize}
                />
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

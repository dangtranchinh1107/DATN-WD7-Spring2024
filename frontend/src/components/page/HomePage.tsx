import React, { useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import ProductItem from "../product/Productitem";

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

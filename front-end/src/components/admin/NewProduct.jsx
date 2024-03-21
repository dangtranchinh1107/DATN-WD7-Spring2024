import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";

import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../redux/api/productsApi";
import { useGetCategoriesQuery } from "../../redux/api/categoryApi";
import { useGetColorsQuery } from "../../redux/api/colorApi";
import { useGetGraphicCardsQuery } from "../../redux/api/graphicCards";
import { useGetCpuQuery } from "../../redux/api/cpuApi";
import { useGethardDisksQuery } from "../../redux/api/hardDisk";
import { useGetRamsQuery } from "../../redux/api/ram";

const NewProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    status: "",
    stock: "",
    color: "",
    cpu: "",
    hardDisk: "",
    ram: "",
    graphicCard: "",
  });
  const [createProduct, { isLoading, error, isSuccess }] =
    useCreateProductMutation();
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery();
  const {
    data: colorData,
    isLoading: colorLoading,
    error: colorError,
  } = useGetColorsQuery();
  const {
    data: graphicCardData,
    isLoading: graphicCardLoading,
    error: graphicCardError,
  } = useGetGraphicCardsQuery();
  const {
    data: cpuData,
    isLoading: cpuLoading,
    error: cpuError,
  } = useGetCpuQuery();
  const {
    data: hardDiskData,
    isLoading: hardDiskLoading,
    error: hardDiskError,
  } = useGethardDisksQuery();
  const {
    data: ramData,
    isLoading: ramLoading,
    error: ramError,
  } = useGetRamsQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Sản phẩm đã được tạo!");
      setTimeout(() => {
        navigate("/admin/products");
      }, 2000);
    }
  }, [error, isSuccess]);

  const {
    name,
    price,
    description,
    category,
    status,
    stock,
    color,
    cpu,
    hardDisk,
    ram,
    graphicCard,
  } = product;

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createProduct(product);
  };

  return (
    <AdminLayout>
      <MetaData title={"Thêm sản phẩm mới"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Thêm sản phẩm</h2>
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                {" "}
                Tên sản phẩm{" "}
              </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description_field" className="form-label">
                Mô tả sản phẩm
              </label>
              <textarea
                className="form-control"
                id="description_field"
                rows="8"
                name="description"
                value={description}
                onChange={onChange}
              ></textarea>
            </div>

            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="price_field" className="form-label">
                  {" "}
                  Giá sản phẩm{" "}
                </label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  name="price"
                  value={price}
                  onChange={onChange}
                />
              </div>

              <div className="mb-3 col">
                <label htmlFor="stock_field" className="form-label">
                  {" "}
                  Số lượng{" "}
                </label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  name="stock"
                  value={stock}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="category_field" className="form-label">
                  {" "}
                  Danh mục sản phẩm{" "}
                </label>
                {categoriesLoading ? (
                  <Loader />
                ) : categoriesError ? (
                  <p>{categoriesError.message}</p>
                ) : (
                  <select
                    id="category_field"
                    className="form-select"
                    name="category"
                    value={category}
                    onChange={onChange}
                  >
                    <option value="">Chọn danh mục</option>
                    {categoriesData?.categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="mb-3 col">
                <label htmlFor="graphicCard_field" className="form-label">
                  {" "}
                  GraphicCard{" "}
                </label>
                {graphicCardLoading ? (
                  <Loader />
                ) : graphicCardError ? (
                  <p>{graphicCardError.message}</p>
                ) : (
                  <select
                    id="graphicCard_field"
                    className="form-select"
                    name="graphicCard"
                    value={graphicCard}
                    onChange={onChange}
                  >
                    <option value="">Chọn graphicCards</option>
                    {graphicCardData?.graphicCard.map((graphicCards) => (
                      <option key={graphicCards._id} value={graphicCards._id}>
                        {graphicCards.type}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="color_field" className="form-label">
                  {" "}
                  Màu sắc{" "}
                </label>
                {colorLoading ? (
                  <Loader />
                ) : colorError ? (
                  <p>{colorError.message}</p>
                ) : (
                  <select
                    id="color_field"
                    className="form-select"
                    name="color"
                    value={color}
                    onChange={onChange}
                  >
                    <option value="">Chọn màu sắc</option>
                    {colorData?.color.map((colors) => (
                      <option key={colors._id} value={colors._id}>
                        {colors.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="mb-3 col">
                <label htmlFor="cpu_field" className="form-label">
                  {" "}
                  CPU{" "}
                </label>
                {cpuLoading ? (
                  <Loader />
                ) : cpuError ? (
                  <p>{cpuError.message}</p>
                ) : (
                  <select
                    id="cpu_field"
                    className="form-select"
                    name="cpu"
                    value={cpu}
                    onChange={onChange}
                  >
                    <option value="">Chọn cpu</option>
                    {cpuData?.cpu.map((cpus) => (
                      <option key={cpus._id} value={cpus._id}>
                        {cpus.type}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="hardDisk_field" className="form-label">
                  {" "}
                  HardDisk{" "}
                </label>
                {hardDiskLoading ? (
                  <Loader />
                ) : hardDiskError ? (
                  <p>{hardDiskError.message}</p>
                ) : (
                  <select
                    id="hardDisk_field"
                    className="form-select"
                    name="hardDisk"
                    value={hardDisk}
                    onChange={onChange}
                  >
                    <option value="">Chọn hardDisk</option>
                    {hardDiskData?.hardDisk.map((hardDisks) => (
                      <option key={hardDisks._id} value={hardDisks._id}>
                        {hardDisks.type}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="mb-3 col">
                <label htmlFor="ram_field" className="form-label">
                  {" "}
                  RAM{" "}
                </label>
                {ramLoading ? (
                  <Loader />
                ) : ramError ? (
                  <p>{ramError.message}</p>
                ) : (
                  <select
                    id="ram_field"
                    className="form-select"
                    name="ram"
                    value={ram}
                    onChange={onChange}
                  >
                    <option value="">Chọn ram</option>
                    {ramData?.ram.map((rams) => (
                      <option key={rams._id} value={rams._id}>
                        {rams.type}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="status_field" className="form-label">
                  {" "}
                  Trạng thái{" "}
                </label>
                <input
                  type="text"
                  id="status_field"
                  className="form-control"
                  name="status"
                  value={status}
                  onChange={onChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Đang thêm..." : "Thêm sản phẩm"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewProduct;

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../redux/api/productsApi";
import { useGetCategoriesQuery } from "../../redux/api/categoryApi";
import { useGetColorsQuery } from "../../redux/api/colorApi";
import { useGetGraphicCardsQuery } from "../../redux/api/graphicCards";
import { useGetCpuQuery } from "../../redux/api/cpuApi";
import { useGethardDisksQuery } from "../../redux/api/hardDisk";
import { useGetRamsQuery } from "../../redux/api/ram";

const UpdateProduct = () => {
  const params = useParams();
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
  const [categories, setCategories] = useState([]);
  const [color, setColor] = useState([]);
  const [graphicCard, setgraphicCard] = useState([]);
  const [cpu, setCpu] = useState([]);
  const [hardDisk, sethardDisk] = useState([]);
  const [ram, setRam] = useState([]);
  const [updateProduct, { isLoading, error, isSuccess }] =
    useUpdateProductMutation();
  const { data } = useGetProductDetailsQuery(params?.id);
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: colorsData } = useGetColorsQuery();
  const { data: graphicCardsData } = useGetGraphicCardsQuery();
  const { data: cpusData } = useGetCpuQuery();
  const { data: hardDisksData } = useGethardDisksQuery();
  const { data: ramsData } = useGetRamsQuery();

  console.log(graphicCardsData);

  useEffect(() => {
    if (data?.product) {
      setProduct({
        name: data?.product?.name,
        price: data?.product?.price,
        description: data?.product?.description,
        category: data?.product?.category,
        status: data?.product?.status,
        stock: data?.product?.stock,
        color: data?.product?.color,
        cpu: data?.product?.cpu,
        hardDisk: data?.product?.hardDisk[0]?.type,
        ram: data?.product?.ram[0]?.type,
        graphicCard: data?.product?.graphicCard,
      });
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Đã cập nhật sản phẩm");

      navigate("/admin/products");
      window.location.reload();
    }
  }, [error, isSuccess, data]);

  useEffect(() => {
    if (categoriesData?.categories) {
      setCategories(categoriesData.categories);
    }
  }, [categoriesData]);

  useEffect(() => {
    if (colorsData?.color) {
      setColor(colorsData.color);
    }
  }, [colorsData]);
  useEffect(() => {
    if (graphicCardsData?.graphicCard) {
      setgraphicCard(graphicCardsData.graphicCard);
    }
  }, [graphicCardsData]);

  useEffect(() => {
    if (cpusData?.cpu) {
      setCpu(cpusData.cpu);
    }
  }, [cpusData]);
  useEffect(() => {
    if (hardDisksData?.hardDisk) {
      sethardDisk(hardDisksData.hardDisk);
    }
  }, [hardDisksData]);
  useEffect(() => {
    if (ramsData?.ram) {
      setRam(ramsData.ram);
    }
  }, [ramsData]);

  const {
    name,
    price,
    description,
    category,
    status,
    stock,
    colors,
    cpus,
    hardDisks,
    rams,
    graphicCards,
  } = product;

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateProduct({ id: params?.id, body: product });
  };

  return (
    <AdminLayout>
      <MetaData title={"Cập nhật sản phẩm"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Cập nhật sản phẩm</h2>
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Tên sản phẩm
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
                  Giá sản phẩm
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
                  Số lượng
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
                  Danh mục sản phẩm
                </label>
                <select
                  id="category_field"
                  className="form-select"
                  name="category"
                  value={category}
                  onChange={onChange}
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 col">
                <label htmlFor="graphicCard_field" className="form-label">
                  graphicCards
                </label>
                <select
                  id="graphicCard_field"
                  className="form-select"
                  name="graphicCard"
                  value={graphicCards}
                  onChange={onChange}
                >
                  <option value="">Chọn graphicCards</option>
                  {graphicCard.map((graphicCards) => (
                    <option key={graphicCards._id} value={graphicCards._id}>
                      {graphicCards.type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="color_field" className="form-label">
                  Màu sắc
                </label>
                <select
                  id="color_field"
                  className="form-select"
                  name="color"
                  value={colors}
                  onChange={onChange}
                >
                  <option value="">Chọn màu sắc</option>
                  {color.map((colorupdate) => (
                    <option key={colorupdate._id} value={colorupdate._id}>
                      {colorupdate.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 col">
                <label htmlFor="cpu_field" className="form-label">
                  CPU
                </label>
                <select
                  id="cpu_field"
                  className="form-select"
                  name="cpu"
                  value={cpus}
                  onChange={onChange}
                >
                  <option value="">Chọn CPU</option>
                  {cpu.map((cpu) => (
                    <option key={cpu._id} value={cpu._id}>
                      {cpu.type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="hardDisk_field" className="form-label">
                  hardDisk
                </label>
                <select
                  id="hardDisk_field"
                  className="form-select"
                  name="hardDisk"
                  value={hardDisks}
                  onChange={onChange}
                >
                  <option value="">Chọn hardDisk</option>
                  {hardDisk.map((hardDisk) => (
                    <option key={hardDisk._id} value={hardDisk._id}>
                      {hardDisk.type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 col">
                <label htmlFor="ram_field" className="form-label">
                  RAM
                </label>
                <select
                  id="ram_field"
                  className="form-select"
                  name="ram"
                  value={rams}
                  onChange={onChange}
                >
                  <option value="">Chọn RAM</option>
                  {ram.map((ram) => (
                    <option key={ram._id} value={ram._id}>
                      {ram.type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="status_field" className="form-label">
                  Trạng thái
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
              {isLoading ? "Đang cập nhật..." : "Cập nhật"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateProduct;

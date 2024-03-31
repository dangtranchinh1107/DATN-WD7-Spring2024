import React, { useEffect } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import {
  useDeleteProductMutation,
  useGetAdminProductsQuery,
} from "../../redux/api/productsApi";
import AdminLayout from "../layout/AdminLayout";

const ListProducts = () => {
  const { data, isLoading, error } = useGetAdminProductsQuery();

  const [
    deleteProduct,
    { isLoading: isDeleteLoading, error: deleteError, isSuccess },
  ] = useDeleteProductMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    console.log(deleteError);
    if (isSuccess) {
      toast.success("Product Deleted");
    }
  }, [error, deleteError, isSuccess]);

  const deleteProductHandler = (id) => {
    deleteProduct(id);
  };

  const setProducts = () => {
    const products = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Tên sản phẩm",
          field: "name",
          sort: "asc",
        },
        {
          label: "Số lượng",
          field: "stock",
          sort: "asc",
        },

        {
          label: "Hành động",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    data?.products?.forEach((product) => {
      products.rows.push({
        id: product?._id,
        name: `${product?.name.substring(0, 20)}...`,
        stock: product?.stock,
        actions: (
          <>
            <Link
              to={`/admin/products/${product?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Link
              to={`/admin/products/${product?._id}/upload_images`}
              className="btn btn-outline-success ms-2"
            >
              <i className="fa fa-image"></i>
            </Link>
            <Link
              to={`/admin/product/${product?._id}`}
              className="btn btn-outline-info ms-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            {/* <button
              className="btn btn-outline-danger ms-2"
              onClick={() => {
                if (window.confirm("Bạn có chắc muốn xoá không?")) {
                  deleteProductHandler(product?._id);
                }
              }}
              disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>
            </button> */}
          </>
        ),
      });
    });

    return products;
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={"Tất cả sản phẩm"} />
      <Link to="/admin/product/new" className="btn btn-outline-success ms-2">
        <i className="fa fa-plus me-2"></i>Thêm sản phẩm
      </Link>
      <h1 className="my-5">{data?.products?.length} Sản phẩm</h1>

      <MDBDataTable
        data={setProducts()}
        className="px-3"
        bproducted
        striped
        hover
      />
    </AdminLayout>
  );
};

export default ListProducts;

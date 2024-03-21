import React from "react";
import SideMenu from "./SideMenu";

const AdminLayout = ({ children }) => {
  const menuItems = [
    {
      name: "Thống kê",
      url: "/admin/dashboard",
      icon: "fas fa-tachometer-alt",
    },
    {
      name: "Thêm sản phẩm",
      url: "/admin/product/new",
      icon: "fas fa-plus",
    },
    {
      name: "Sản phẩm",
      url: "/admin/products",
      icon: "fab fa-product-hunt",
    },
    {
      name: "Đơn đặt hàng",
      url: "/admin/orders",
      icon: "fas fa-receipt",
    },
    {
      name: "Người dùng",
      url: "/admin/users",
      icon: "fas fa-user",
    },
    {
      name: "Đánh giá",
      url: "/admin/reviews",
      icon: "fas fa-star",
    },
  ];

  return (
    <div>
      <div className="mt-2 mb-4 py-4">
        <h2 className="text-center fw-bolder">
          Trang thống kê dành cho Quản trị viên
        </h2>
      </div>

      <div className="row justify-content-around">
        <div className="col-12 col-lg-3">
          <SideMenu menuItems={menuItems} />
        </div>
        <div className="col-12 col-lg-8 user-dashboard">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;

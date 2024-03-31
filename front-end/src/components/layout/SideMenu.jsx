import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SideMenu = ({ menuItems }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleSelectChange = (event) => {
    const selectedUrl = event.target.value;
    setActiveMenuItem(selectedUrl);
    if (selectedUrl !== "/admin") {
      navigate(selectedUrl);
    }
  };

  // Chỉ chọn các mục: "Quản lý sản phẩm", "Quản lý danh mục", "Quản lý GraphicCards",
  // "Quản lý Màu sắc", "Quản lý Cpu", "Quản lý HardDisk", "Quản lý RAM"
  const selectOptions = [
    {
      name: "Quản lý",
      url: "/admin",
    },
    {
      name: "Quản lý Sản phẩm",
      url: "/admin/products",
      icon: "fab fa-product-hunt",
    },
    {
      name: "Quản lý Danh mục",
      url: "/admin/categories",
      icon: "fab fa-product-hunt",
    },
    {
      name: "Quản lý GraphicCards",
      url: "/admin/graphicCards",
      icon: "fab fa-product-hunt",
    },
    {
      name: "Quản lý Màu sắc",
      url: "/admin/colors",
      icon: "fab fa-product-hunt",
    },
    {
      name: "Quản lý Cpu",
      url: "/admin/cpus",
      icon: "fab fa-product-hunt",
    },
    {
      name: "Quản lý HardDisk",
      url: "/admin/hardDisks",
      icon: "fab fa-product-hunt",
    },
    {
      name: "Quản lý Ram",
      url: "/admin/rams",
      icon: "fab fa-product-hunt",
    },
  ];

  return (
    <div className="mt-5 pl-4">
      {/* List group */}
      <div className="list-group">
        {menuItems?.map((menuItem, index) => (
          <Link
            key={index}
            to={menuItem.url}
            className={`list-group-item list-group-item-action ${
              activeMenuItem === menuItem.url ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem(menuItem.url)}
            aria-current={activeMenuItem === menuItem.url ? "true" : "false"}
          >
            <i className={`${menuItem.icon} fa-fw pe-2`}></i> {menuItem.name}
          </Link>
        ))}
      </div>
      {/* Dropdown select option */}
      <select
        className="form-select mb-3"
        aria-label="Chọn mục"
        value={activeMenuItem}
        onChange={handleSelectChange}
      >
        {selectOptions.map((menuItem, index) => (
          <option key={index} value={menuItem.url}>
            <i className={`${menuItem.icon} fa-fw pe-2`}></i> {menuItem.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SideMenu;

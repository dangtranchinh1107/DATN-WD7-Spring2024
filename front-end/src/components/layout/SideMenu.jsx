import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/admin.css";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];
const SideMenu = ({ menuItems }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleMenuItemClick = (url) => {
    setActiveMenuItem(url);
    navigate(url);
  };

  // Chỉ chọn các mục: "Quản lý sản phẩm", "Quản lý danh mục", "Quản lý GraphicCards",
  // "Quản lý Màu sắc", "Quản lý Cpu", "Quản lý HardDisk", "Quản lý RAM"
  const selectOptions = [
    {
      name: "Quản lý",
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
    <div className="">
      <div className="content mt-5 pl-4 bg-warning-subtle ">
        {/* List group */}
        <div className="list-group">
          {menuItems?.map((menuItem, index) => (
            <Link
              key={index}
              to={menuItem.url}
              className={`list-group-item list-group-item-action ${
                activeMenuItem === menuItem.url ? "active" : "bg-warning-subtle"
              }`}
              onClick={() => setActiveMenuItem(menuItem.url)}
              aria-current={activeMenuItem === menuItem.url ? "true" : "false"}
            >
              <i className={`${menuItem.icon} fa-fw pe-2`}></i> {menuItem.name}
            </Link>
          ))}
        </div>

        {/* Render các mục từ mảng selectOptions */}
        <div className="list-group mt-3">
          {selectOptions.map((menuItem, index) => (
            <button
              key={index}
              className={`list-group-item list-group-item-action ${
                activeMenuItem === menuItem.url
                  ? "active"
                  : "bg-warning-subtle "
              }`}
              onClick={() => handleMenuItemClick(menuItem.url)}
              aria-current={activeMenuItem === menuItem.url ? "true" : "false"}
            >
              <i className={`${menuItem.icon} fa-fw pe-2`}></i> {menuItem.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;

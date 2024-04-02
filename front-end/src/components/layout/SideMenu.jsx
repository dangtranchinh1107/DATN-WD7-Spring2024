import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SideMenu = ({ menuItems }) => {
  const location = useLocation();

  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

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
    </div>
  );
};

export default SideMenu;

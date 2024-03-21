import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import "../../assets/css/home.css";
import logo from "../../assets/logo.png";

import { Link, useNavigate } from "react-router-dom";

import { useGetMeQuery } from "../../redux/api/userApi";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
import { logoutUser } from "../../redux/features/userSlice";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useGetMeQuery();
  // console.log(data);
  const [logout] = useLazyLogoutQuery();

  const { user } = useSelector((state) => state.auth);
  const logoutHandler = async () => {
    try {
      await logout();

      // Xóa thông tin người dùng và token khỏi local storage hoặc bất kỳ nơi lưu trữ khác
      dispatch(logoutUser());

      navigate(0);
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand">
          <a href="/">
            <img src={logo} alt="ShopIT Logo" className="logo" />
          </a>
        </div>
      </div>
      <div className="col-12 col-md-6 pt-2 mt-md-0">
        <Search />
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <a href="/cart" style={{ textDecoration: "none" }}>
          <span id="cart" className="ms-3">
            {" "}
            Giỏ hàng{" "}
          </span>
          <span className="ms-1" id="cart_count">
            {cartItems?.length}
          </span>
        </a>

        {user ? (
          <div className="ms-4 dropdown">
            <button
              className="btn dropdown-toggle text-white"
              type="button"
              id="dropDownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <figure className="avatar avatar-nav">
                <img
                  src={
                    user?.avatar
                      ? user?.avatar?.url
                      : "/images/default_avatar.jpg"
                  }
                  alt="User Avatar"
                  className="rounded-circle"
                />
              </figure>
              <span>{user?.name}</span>
            </button>
            <div
              className="dropdown-menu w-100"
              aria-labelledby="dropDownMenuButton"
            >
              {user?.role === "admin" && (
                <Link className="dropdown-item" to="/admin/dashboard">
                  {" "}
                  Thống kê{" "}
                </Link>
              )}

              <Link className="dropdown-item" to="/me/orders">
                {" "}
                Đơn đặt hàng{" "}
              </Link>

              <Link className="dropdown-item" to="/me/profile">
                {" "}
                Hồ sơ người dùng{" "}
              </Link>

              <Link
                className="dropdown-item text-danger"
                to="/"
                onClick={logoutHandler}
              >
                Đăng xuất{" "}
              </Link>
            </div>
          </div>
        ) : (
          !isLoading && (
            <Link to="/login" className="btn ms-4" id="login_btn">
              {" "}
              Đăng nhập{" "}
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Header;

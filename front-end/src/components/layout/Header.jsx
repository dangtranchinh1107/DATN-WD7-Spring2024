<<<<<<< HEAD
import { useSelector } from "react-redux";
import "../../assets/css/home.css";
import { useNavigate } from "react-router-dom";
import { useGetMeQuery } from "../../redux/api/userApi";
import { Link } from "react-router-dom";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
const Header = () => {
=======
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
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
  const navigate = useNavigate();
  const { isLoading } = useGetMeQuery();
  // console.log(data);
  const [logout] = useLazyLogoutQuery();

  const { user } = useSelector((state) => state.auth);
<<<<<<< HEAD
  const logoutHandler = () => {
    logout();
    navigate(0);
=======
  const logoutHandler = async () => {
    try {
      await logout();

      // Xóa thông tin người dùng và token khỏi local storage hoặc bất kỳ nơi lưu trữ khác
      dispatch(logoutUser());

      navigate(0);
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
  };
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand">
          <a href="/">
<<<<<<< HEAD
            <img className="logo" src="/logo.png" alt="ShopIT Logo" />
=======
            <img src={logo} alt="ShopIT Logo" className="logo" />
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
          </a>
        </div>
      </div>
      <div className="col-12 col-md-6 pt-2 mt-md-0">
<<<<<<< HEAD
        <form action="your_search_action_url_here" method="get">
          <div className="input-group ">
            <input
              type="text"
              id="search_field"
              aria-describedby="search_btn"
              className="form-control "
              placeholder="Enter Product Name ..."
              name="keyword"
              value=""
            />
            <button id="search_btn" className="btn" type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </form>
=======
        <Search />
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <a href="/cart" style={{ textDecoration: "none" }}>
          <span id="cart" className="ms-3">
            {" "}
<<<<<<< HEAD
            Cart{" "}
=======
            Giỏ hàng{" "}
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
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
<<<<<<< HEAD
                  src="../images/default_avatar.jpg"
=======
                  src={
                    user?.avatar
                      ? user?.avatar?.url
                      : "/images/default_avatar.jpg"
                  }
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
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
<<<<<<< HEAD
              <Link className="dropdown-item" to="/admin/dashboard">
                {" "}
                Dashboard{" "}
              </Link>

              <Link className="dropdown-item" to="/me/orders">
                {" "}
                Orders{" "}
=======
              {user?.role === "admin" && (
                <Link className="dropdown-item" to="/admin/dashboard">
                  {" "}
                  Thống kê{" "}
                </Link>
              )}

              <Link className="dropdown-item" to="/me/orders">
                {" "}
                Đơn đặt hàng{" "}
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
              </Link>

              <Link className="dropdown-item" to="/me/profile">
                {" "}
<<<<<<< HEAD
                Profile{" "}
=======
                Hồ sơ người dùng{" "}
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
              </Link>

              <Link
                className="dropdown-item text-danger"
                to="/"
                onClick={logoutHandler}
              >
<<<<<<< HEAD
                Logout{" "}
=======
                Đăng xuất{" "}
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
              </Link>
            </div>
          </div>
        ) : (
          !isLoading && (
            <Link to="/login" className="btn ms-4" id="login_btn">
              {" "}
<<<<<<< HEAD
              Login{" "}
=======
              Đăng nhập{" "}
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/api/authApi";
=======
import { useLoginMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [login, { isLoading, error, data }] = useLoginMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error, isAuthenticated]);

  const submitHandler = (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };

    login(loginData);
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow rounded bg-body" onSubmit={submitHandler}>
<<<<<<< HEAD
          <h2 className="mb-4">Login</h2>
=======
          <h2 className="mb-4">Đăng nhập</h2>
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">
<<<<<<< HEAD
              Password
=======
              Mật khẩu
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
            </label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

<<<<<<< HEAD
          <Link href="/password/forgot" className="float-end mb-4">
            Forgot Password?
=======
          <Link to="/password/forgot" className="float-end mb-4">
            Quên mật khẩu?
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
          </Link>

          <button
            id="login_button"
            type="submit"
            className="btn w-100 py-2"
            disabled={isLoading}
          >
<<<<<<< HEAD
            {isLoading ? "Authenticating..." : "LOGIN"}
=======
            {isLoading ? "Đang xác thực..." : "Đăng nhập"}
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
          </button>

          <div className="my-3">
            <Link to="/register" className="float-end">
<<<<<<< HEAD
              New User?
=======
              Đăng ký?
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

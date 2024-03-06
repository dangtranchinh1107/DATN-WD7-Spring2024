import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import imgMobile from "../img/mobile.svg";
// import { useSelector } from "react-redux";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();
  const [login, { isLoading, error, data }] = useLoginMutation();

  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data?.token);
    }
  }, [data]);
  // console.log(data);

  // const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // if (isAuthenticated) {
    //   navigate("/");
    // }

    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    login(loginData);
  };

  return (
    <div className="container mt-4 w-full gap-[100px] bg-white flex items-center">
      <div className="w-[55%] overflow-hidden h-screen">
        <img src={imgMobile} alt="" />
      </div>
      <div className="wrapper w-[45%] flex flex-col justify-center items-start">
        <div className="w-full max-w-[530px]">
          <h2 className="text-[36px] text-left mb-6 font-medium leading-[30px] text-[#262626]">
            Log in to Exclusive
          </h2>

          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
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
                Password
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

            <a href="/password/forgot" className="float-end mb-4">
              Forgot Password?
            </a>

            <button
              id="login_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "LOGIN"}
            </button>

            <div className="my-3">
              <Link to="/register" className="float-end">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

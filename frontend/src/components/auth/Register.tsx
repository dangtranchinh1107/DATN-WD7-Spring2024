import React, { useEffect, useState } from "react";
import { useRegisterMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import imgMobile from "../img/mobile.svg";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [register, { isLoading, error, data }] = useRegisterMutation();
  // console.log(data);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);
  const submitHandler = (e) => {
    e.preventDefault();

    const signupData = {
      name,
      email,
      password,
    };
    register(signupData);
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="container mt-4 w-full gap-[100px] bg-white flex items-center">
      <div className="w-[55%] overflow-hidden h-screen">
        <img src={imgMobile} alt="" />
      </div>
      <div className="wrapper w-[45%] flex flex-col justify-center items-start">
        <div className="w-full max-w-[530px]">
          <h2 className="text-[36px] text-left mb-6 font-medium leading-[30px] text-[#262626]">
            Create an account
          </h2>

          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Name
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
              <label htmlFor="email_field" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
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
                onChange={onChange}
              />
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Sign Up" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

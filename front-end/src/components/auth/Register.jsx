import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../../redux/api/authApi";

<<<<<<< HEAD
=======
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4

  const { name, email, password } = user;

  const [register, { isLoading, error, data }] = useRegisterMutation();
<<<<<<< HEAD

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);
=======
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // if (isAuthenticated) {
    //   navigate("/");
    // }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error, isAuthenticated]);
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4

  const submitHandler = (e) => {
    e.preventDefault();

    const signUpData = {
      name,
      email,
      password,
    };

    register(signUpData);
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow rounded bg-body" onSubmit={submitHandler}>
<<<<<<< HEAD
          <h2 className="mb-4">Register</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              Name
=======
          <h2 className="mb-4">Đăng ký tài khoản</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              Tên người dùng
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
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
              onChange={onChange}
            />
          </div>

          <button
            id="register_button"
            type="submit"
            className="btn w-100 py-2"
            disabled={isLoading}
          >
<<<<<<< HEAD
            {isLoading ? "Creating..." : "REGISTER"}
=======
            {isLoading ? "Đang đăng ký..." : "Đăng ký"}
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

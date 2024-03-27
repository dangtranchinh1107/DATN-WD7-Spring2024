import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";
import { getResetPasswordTemPlates } from "../utils/emailTemplates.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendEmail from "../utils/sendEmail.js";
import sendToken from "../utils/sendToken.js";
import crypto from "crypto";
import { loginValid, registerValid } from "../validation/user.js";

// dky user  => /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});

// dangnhap user  => /api/v1/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Phải điền email & password", 400));
  }

  //tìm kiếm user trong database
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Email hoặc mật khẩu không hợp lệ", 401));
  }

  //ktra mk
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Email hoặc mật khẩu không hợp lệ", 401));
  }

  sendToken(user, 200, res);
});

// dangxuat user  => /api/v1/logout
export const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    message: "logged out",
  });
});

// Quên mật khẩu  => /api/v1/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  //tìm kiếm user trong database
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ErrorHandler("Không tìm thấy người dùng với email này", 404)
    );
  }

  //dặt lại mk
  const resetToken = user.getResetPasswordToken();

  await user.save();

  //gửi khôi phục mk

  const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`;

  const message = getResetPasswordTemPlates(user?.name, resetUrl);
  try {
    await sendEmail({
      email: user.email,
      subject: "Khôi phục mật khẩu Techlap",
      message,
    });

    res.status(200).json({
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    return next(new ErrorHandler(error?.message, 500));
  }
  sendToken(user, 200, res);
});

// đặt lại mk mới   =>  /api/v1/password/reset/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash the URL Token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("mật khẩu không đúng", 400));
  }

  // đặtlại mk mới
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//nhận hồ sô người dùng => /api/v1/me
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req?.user?._id);
  res.status(200).json({
    user,
  });
});
// Nhận tất cả người dùng - ADMIN  =>  /api/v1/admin/users
export const allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    users,
  });
});

// Nhận thông tin chi tiết người dùng - ADMIN  =>  /api/v1/admin/users/:id
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User not found with id: ${req.params.id}`, 400)
    );
  }
  res.status(200).json({
    user,
  });
});

//cập nhật thông tin chi tiết người dùng - ADMIN => /api/v1/admin/users/:id
export const updateUser = catchAsyncErrors(async (req, res, next) => {
  try {
    // Kiểm tra xem có thông tin mới của người dùng không
    const { name, email, role } = req.body;
    if (!name || !email || !role) {
      return res.status(400).json({
        success: false,
        message: "Tên, email và vai trò là bắt buộc",
      });
    }

    // kt xem id của người dùng
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    // cập nhật user
    user.name = name;
    user.email = email;
    user.role = role;

    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// delete user - ADMIN  =>  /api/v1/admin/users/:id
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`Không tìm thấy người dùng: ${req.params.id}`, 400)
    );
  }
  if (user.role === "admin") {
    return next(new ErrorHandler(`Tài khoản "Admin" không thể xóa!`, 403));
  }
  // TODO - Remove user avatar from cloudinary
  await user.deleteOne();
  res.status(200).json({
    success: true,
  });
});

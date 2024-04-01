import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/order.js";
import Product from "../models/Product.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendEmail from "../utils/sendEmail.js";
import { getOrderTemplates } from "../utils/emailOrderTemplates.js";
//Tạo mới Order => /api/v1/orders/new

export const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id,
  });
  // Gửi email cho người đặt hàng
  const message = getOrderTemplates(
    req.user.name,
    orderItems,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    shippingInfo
  );
  await sendEmail({
    email: req.user.email,
    subject: "Xác nhận đơn hàng",
    message,
  });

  res.status(200).json({
    order,
  });
});

//Xem đơn đặt hàng của người dùng hiện tại => /api/v1/me/orders

export const myOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });
  res.status(200).json({
    order,
  });
});
//Xem chi tiết đơn hàng => /api/v1/orders/:id

export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }
  res.status(200).json({
    order,
  });
});

//Xem tất cả các đơn đặt hàng - ADMIN => /api/v1/admin
export const allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    orders,
  });
});

//Cập nhật đơn đặt hàng - ADMIN => /api/v1/admin/orders/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }
  if (order?.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }
  if (order?.orderStatus === "Hủy") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }
  //update product stock
  order?.Cart?.forEach(async (item) => {
    const product = await Product.findById(item?.product?.toString());
    if (!product) {
      return next(new ErrorHandler("No Product found with this ID", 404));
    }
    product.stock = product.stock - item.quantity;
    await product.save({ validateBeforeSave: false });
  });

  // Kiểm tra xem orderStatus có phải là "Hoàn tất" không
  if (req.body.status === "Hoàn tất") {
    // Nếu là "Hoàn tất", cập nhật lại paymentInfo là "Đã thanh toán"
    order.paymentInfo.status = "Đã thanh toán";
  }

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();
  await order.save();
  res.status(200).json({
    success: true,
  });
});

//Xoá đơn đặt hàng => /api/v1/admin/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID"), 404);
  }

  await order.deleteOne();
  res.status(200).json({
    success: true,
  });
});

// hủy đơn hàng từ phía người dùng
export const updateOrderMe = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) {
    return next(new ErrorHandler("Không tìm thấy đơn hàng với ID này", 404));
  }

  if (order.orderStatus === "Hủy") {
    return next(new ErrorHandler("Đơn hàng đã được hủy", 400));
  }

  // Cập nhật lại trạng thái thành "Hủy"
  order.orderStatus = "Hủy";
  await order.save();

  res.status(200).json({
    success: true,
  });
});

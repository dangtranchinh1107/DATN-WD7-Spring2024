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
    return next(new ErrorHandler("Không tìm thấy đơn hàng nào có ID này", 404));
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
    return next(new ErrorHandler("Không tìm thấy đơn hàng nào có ID này", 404));
  }
  if (order?.orderStatus === "Hoàn tất") {
    return next(new ErrorHandler("Bạn đã hoàn tất đơn đặt hàng này", 400));
  }

  let productNotFound = false;

  //update product stock
  order?.Cart?.forEach(async (item) => {
    const product = await Product.findById(item?.product?.toString());
    if (!product) {
      return next(new ErrorHandler("No Product found with this ID", 404));
    }
    product.stock = product.stock - item.quantity;
    await product.save({ validateBeforeSave: false });
  });
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
    return next(new ErrorHandler("Không tìm thấy đơn hàng nào có ID này"), 404);
  }

  await order.deleteOne();
  res.status(200).json({
    success: true,
  });
});

//
async function getSalesData(startDate, endDate) {
  const salesData = await Order.aggregate([
    {
      //Bước 1 - Lọc kết quả
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      //Bước 2 - Nhóm Data
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        },
        totalSales: { $sum: "$totalAmount" },
        totalQuantity: { $sum: "$totalAmount" },
        numOrders: { $sum: 1 }, // Đếm số lượng đơn đặt hàng
      },
    },
  ]);
  //Tạo Map đến store sales data
  const salesMap = new Map();
  let totalSales = 0;
  let totalNumOrders = 0;

  salesData.forEach((entry) => {
    const date = entry?._id.date;
    const sales = entry?.totalSales;
    const numOrders = entry?.numOrders;

    salesMap.set(date, { sales, numOrders });
    totalSales += sales;
    totalNumOrders += numOrders;
  });
  //Tạo một mảng ngày giữa ngày bắt đầu và ngày kết thúc
  const datesBetween = getDatesBetween(startDate, endDate);
  //Tạo mảng dữ liệu bán hàng cuối cùng bằng 0 cho những ngày không có doanh số bán hàng
  const finalSalesData = datesBetween.map((date) => ({
    date,
    sales: (salesMap.get(date) || { sales: 0 }).sales,
    numOrders: (salesMap.get(date) || { numOrders: 0 }).numOrders,
  }));

  return { salesData: finalSalesData, totalSales, totalNumOrders };
}

function getDatesBetween(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    const formattedDate = currentDate.toISOString().split("T")[0];
    dates.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

//Lấy dữ liệu bán hàng => /api/v1/admin/get_sales
export const getSales = catchAsyncErrors(async (req, res, next) => {
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);

  startDate.setUTCHours(0, 0, 0, 0);
  endDate.setUTCHours(23, 59, 59, 999);
  const { salesData, totalSales, totalNumOrders } = await getSalesData(
    startDate,
    endDate
  );

  res.status(200).json({
    totalSales,
    totalNumOrders,
    sales: salesData,
  });
});

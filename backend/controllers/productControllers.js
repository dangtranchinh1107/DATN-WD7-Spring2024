import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/Product.js";
import ErrorHandler from "../utils/errorHandler.js";

// Lấy tất cả sản phẩm => /api/v1/products
export const getProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    message: "Lấy danh sách sản phẩm thành công",
    products,
  });
});

// Lấy 1 sản phẩm => /api/v1/products/:id
export const getProductDetail = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id);
  if (!product) {
    return next(new ErrorHandler("Không tìm thấy sản phẩm", 400));
  }
  res.status(200).json({
    message: "Sản phẩm cần tìm",
    product,
  });
});

// Tạo sản phẩm mới => /api/v1/admin/products
export const newProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    message: "Tạo sản phẩm thành công",
    product,
  });
});
// Cập nhật sản phẩm => /api/v1/products/:id

export const updateProduct = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req?.params?.id);

  if (!product) {
    next(new ErrorHandler("Không tìm thấy sản phẩm", 400));
  }

  product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({
    product,
  });
});
// Xóa sản phẩm => /api/v1/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req?.params?.id);
  if (!product) {
    return next(new ErrorHandler("Không tìm thấy sản phẩm", 400));
  }
  await product.deleteOne();
  res.status(200).json({
    message: "Sản phẩm đã xóa",
  });
});

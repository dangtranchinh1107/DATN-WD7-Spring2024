import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";

// Lấy tất cả sản phẩm => /api/v1/products
export const getProducts = catchAsyncErrors(async (req, res, next) => {
  // Get All Pro
  // const products = await Product.find().populate({
  //   path: "category",
  //   select: "-_id name",
  // });

  const resPerPage = 4;

  // Search Pro
  const apiFilters = new APIFilters(
    Product.find().populate({
      path: "category",
      select: "-_id name",
    }),
    req.query
  )
    .search()
    .filters();

  const productsFilters = await apiFilters.query;
  const productsFiltersCount = productsFilters.length;

  // Pagination;
  apiFilters.pagination(resPerPage);
  const products = await apiFilters.query.clone();

  res.status(200).json({
    message: "Lấy danh sách sản phẩm thành công",
    resPerPage,
    productsFiltersCount,
    // productsFilters,
    products,
  });
});

// Lấy 1 sản phẩm => /api/v1/products/:id
export const getProductDetail = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id).populate({
    path: "category",
    select: "-_id name",
  });
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
  // Thêm sản phẩm vào danh mục
  const updateCategory = await Category.findByIdAndUpdate(product.category, {
    $addToSet: {
      products: product._id,
    },
  });
  if (!updateCategory) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn danh sách",
    });
  }
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
  // Thêm sản phẩm vào danh mục
  const updateCategory = await Category.findByIdAndUpdate(product.category, {
    $addToSet: {
      products: product._id,
    },
  });
  if (!updateCategory) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn danh sách",
    });
  }
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

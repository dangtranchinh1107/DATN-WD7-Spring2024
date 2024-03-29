import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Category from "../models/Category.js";
import Color from "../models/Color.js";
import Cpu from "../models/Cpu.js";
import GraphicCard from "../models/GraphicCard.js";
import HardDisk from "../models/HardDisk.js";
import Product from "../models/Product.js";
import Ram from "../models/Ram.js";
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
    Product.find()
      .populate({
        path: "category",
        select: "-_id name",
      })
      .populate({
        path: "color",
        select: "-_id name",
      })
      .populate({
        path: "ram",
        select: "-_id type",
      })
      .populate({
        path: "cpu",
        select: "-_id type",
      })
      .populate({
        path: "hardDisk",
        select: "-_id type",
      })
      .populate({
        path: "graphicCard",
        select: "-_id type",
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
  const product = await Product.findById(req?.params?.id)
    .populate({
      path: "category",
      select: "-_id name",
    })
    .populate({
      path: "color",
      select: "-_id name",
    })
    .populate({
      path: "ram",
      select: "-_id type",
    })
    .populate({
      path: "cpu",
      select: "-_id type",
    })
    .populate({
      path: "hardDisk",
      select: "-_id type",
    })
    .populate({
      path: "graphicCard",
      select: "-_id type",
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
  // Thêm màu
  const updateColor = await Color.findByIdAndUpdate(product.color, {
    $addToSet: {
      products: product._id,
    },
  });
  if (!updateColor) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn màu",
    });
  }
  // Thêm ram
  const updateRam = await Ram.findByIdAndUpdate(product.ram, {
    $addToSet: {
      products: product._id,
    },
  });
  if (!updateRam) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn Ram",
    });
  }
  // Thêm cpu
  const updateCpu = await Cpu.findByIdAndUpdate(product.cpu, {
    $addToSet: {
      products: product._id,
    },
  });
  if (!updateCpu) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn Cpu",
    });
  }
  // Thêm hardDisk
  const updateHardDisk = await HardDisk.findByIdAndUpdate(product.hardDisk, {
    $addToSet: {
      products: product._id,
    },
  });
  if (!updateHardDisk) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn Hard Disk",
    });
  }
  // Thêm graphicCard
  const updateGraphicCard = await GraphicCard.findByIdAndUpdate(
    product.graphicCard,
    {
      $addToSet: {
        products: product._id,
      },
    }
  );
  if (!updateGraphicCard) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn Graphic Card",
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
  // Thêm màu
  const updateColor = await Color.findByIdAndUpdate(product.color, {
    $addToSet: {
      color: product._id,
    },
  });
  if (!updateColor) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn màu",
    });
  }
  // Thêm ram
  const updateRam = await Ram.findByIdAndUpdate(product.ram, {
    $addToSet: {
      ram: product._id,
    },
  });
  if (!updateRam) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn Ram",
    });
  }
  // Thêm cpu
  const updateCpu = await Cpu.findByIdAndUpdate(product.cpu, {
    $addToSet: {
      cpu: product._id,
    },
  });
  if (!updateCpu) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn Cpu",
    });
  }
  // Thêm hardDisk
  const updateHardDisk = await HardDisk.findByIdAndUpdate(product.hardDisk, {
    $addToSet: {
      hardDisk: product._id,
    },
  });
  if (!updateHardDisk) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn Hard Disk",
    });
  }
  // Thêm graphicCard
  const updateGraphicCard = await GraphicCard.findByIdAndUpdate(
    product.graphicCard,
    {
      $addToSet: {
        graphicCard: product._id,
      },
    }
  );
  if (!updateGraphicCard) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn Graphic Card",
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

// Tạo/Update sản phẩm review => /api/v1/reviews
export const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user?._id,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Không tìm thấy sản phẩm", 400));
  }

  const isReviewd = product?.reviews?.find(
    (r) => r.user.toString() === req?.user?._id.toString()
  );
  if (isReviewd) {
    product.reviews.forEach((review) => {
      if (review?.user?.toString() === req?.user?._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// lấy tất cả sản phẩm review => /api/v1/reviews
export const getProductReviews = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Không tìm thấy sản phẩm", 400));
  }
  res.status(200).json({
    reviews: product.reviews,
  });
});

// Xoá sản phẩm review => /api/v1/admin/reviews
export const deleteProductReview = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Không tìm thấy sản phẩm", 400));
  }

  const reviews = product?.reviews?.filter(
    (review) => review._id.toString() === req?.user?.id.toString()
  );

  const numOfReviews = reviews.length;
  const rating =
    numOfReviews === 0
      ? 0
      : product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        numOfReviews;

  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, numOfReviews, rating },
    { new: true }
  );

  res.status(200).json({
    success: true,
    product,
  });
});

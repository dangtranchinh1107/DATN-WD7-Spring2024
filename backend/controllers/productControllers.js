import Product from "../models/Product.js";

// Lấy tất cả sản phẩm => /api/v1/products
export const getProducts = async (req, res) => {
  res.status(200).json({
    message: "All Products",
  });
};

// Tạo sản phẩm mới => /api/v1/admin/products
export const newProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    product,
  });
};

import Product from "../models/Product.js";

// Lấy tất cả sản phẩm => /api/v1/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      message: "Lấy danh sách sản phẩm thành công",
      products,
    });
  } catch (error) {
    res.status(200).json({
      message: "Lấy danh sách sản phẩm thất bại",
    });
  }
};

// Lấy 1 sản phẩm => /api/v1/products/:id
export const getProductDetail = async (req, res) => {
  try {
    const product = await Product.findById(req?.params?.id);
    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    res.status(200).json({
      message: "Sản phẩm cần tìm",
      product,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm",
    });
  }
};

// Tạo sản phẩm mới => /api/v1/admin/products
export const newProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({
      message: "Tạo sản phẩm thành công",
      product,
    });
  } catch (error) {
    res.status(200).json({
      message: "Tạo sản phẩm thất bại",
    });
  }
};

// Cập nhật sản phẩm => /api/v1/products/:id

export const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req?.params?.id);

    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }

    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
      new: true,
    });

    res.status(200).json({
      product,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm",
    });
  }
};
// Xóa sản phẩm => /api/v1/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req?.params?.id);
    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    await product.deleteOne();
    res.status(200).json({
      message: "Sản phẩm đã xóa",
    });
  } catch (error) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm",
    });
  }
};

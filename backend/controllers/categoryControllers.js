import Category from "../models/Category.js";

export const newCategory = async (req, res) => {
  const product = await Category.create(req.body);
  res.status(200).json({
    product,
  });
};

import express from "express";
import {
  deleteCategory,
  getCategories,
  getCategoryDetail,
  newCategory,
  updateCategory,
} from "../controllers/categoryControllers.js";

const router = express.Router();

router.route("/categories").get(getCategories);
router.route("/category/:id").get(getCategoryDetail);
router.route("/admin/category").post(newCategory);
router.route("/category/:id").put(updateCategory);
router.route("/category/:id").delete(deleteCategory);

export default router;

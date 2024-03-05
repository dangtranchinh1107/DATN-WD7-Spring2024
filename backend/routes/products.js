import express from "express";

import {
  createProductReview,
  deleteProduct,
  deleteProductReview,
  getProductDetail,
  getProductReviews,
  getProducts,
  newProduct,
  updateProduct,
} from "../controllers/productControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();

router.route("/products").get(getProducts);
router.route("/product/:id").get(getProductDetail);

router
  .route("/admin/product")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router.route("/admin/product/:id").put(updateProduct);
router.route("/admin/product/:id").delete(deleteProduct);

router.route("/reviews").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(isAuthenticatedUser, getProductReviews);
router
  .route("/admin/reviews")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProductReview);

export default router;

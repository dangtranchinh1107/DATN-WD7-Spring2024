import express from "express";

import { getProducts } from "../controllers/productControllers.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();

router.route("/products").get(isAuthenticatedUser, getProducts);


import {
  deleteProduct,
  getProductDetail,
  getProducts,
  newProduct,
  updateProduct,
} from "../controllers/productControllers.js";
const router = express.Router();

router.route("/products").get(getProducts);
router.route("/product/:id").get(getProductDetail);
router.route("/admin/product").post(newProduct);
router.route("/product/:id").put(updateProduct);
router.route("/product/:id").delete(deleteProduct);


export default router;

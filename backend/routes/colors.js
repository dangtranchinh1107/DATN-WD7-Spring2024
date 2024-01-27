import express from "express";
import {
  deleteColor,
  getColor,
  getColorDetail,
  newColor,
  updateColor,
} from "../controllers/colorControllers.js";

const router = express.Router();

router.route("/colors").get(getColor);
router.route("/color/:id").get(getColorDetail);
router.route("/admin/color").post(newColor);
router.route("/color/:id").put(updateColor);
router.route("/color/:id").delete(deleteColor);

export default router;

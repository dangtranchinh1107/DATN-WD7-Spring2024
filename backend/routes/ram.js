import express from "express";
import {
  deleteRam,
  getRam,
  getRamDetail,
  newRam,
  updateRam,
} from "../controllers/ramControllers.js";

const router = express.Router();

router.route("/rams").get(getRam);
router.route("/ram/:id").get(getRamDetail);
router.route("/admin/ram").post(newRam);
router.route("/ram/:id").put(updateRam);
router.route("/ram/:id").delete(deleteRam);

export default router;

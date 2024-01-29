import express from "express";
import {
  deleteHardDisk,
  getHardDisk,
  getHardDiskDetail,
  newHardDisk,
  updateHardDisk,
} from "../controllers/hardDiskControllers.js";

const router = express.Router();

router.route("/hardDisks").get(getHardDisk);
router.route("/hardDisk/:id").get(getHardDiskDetail);
router.route("/admin/hardDisk").post(newHardDisk);
router.route("/hardDisk/:id").put(updateHardDisk);
router.route("/hardDisk/:id").delete(deleteHardDisk);

export default router;

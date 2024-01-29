import express from "express";
import {
  deleteCpu,
  getCpu,
  getCpuDetail,
  newCpu,
  updateCpu,
} from "../controllers/cpuControllers.js";

const router = express.Router();

router.route("/cpus").get(getCpu);
router.route("/cpu/:id").get(getCpuDetail);
router.route("/admin/cpu").post(newCpu);
router.route("/cpu/:id").put(updateCpu);
router.route("/cpu/:id").delete(deleteCpu);

export default router;

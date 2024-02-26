import express from "express";
import {
  deleteGraphicCard,
  getGraphicCard,
  getGraphicCardDetail,
  newGraphicCard,
  updateGraphicCard,
} from "../controllers/graphicCard.js";

const router = express.Router();

router.route("/graphicCards").get(getGraphicCard);
router.route("/graphicCard/:id").get(getGraphicCardDetail);
router.route("/admin/graphicCard").post(newGraphicCard);
router.route("/graphicCard/:id").put(updateGraphicCard);
router.route("/graphicCard/:id").delete(deleteGraphicCard);

export default router;
